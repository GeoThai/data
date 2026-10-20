// Checks every file against datapackage.json and against the other files. Run: bun scripts/check.ts
type Field = {
  name: string;
  type: string;
  constraints?: { required?: boolean; pattern?: string; enum?: string[] };
};
type Resource = { name: string; path: string; format: string; schema?: { fields: Field[] } };
type Row = Record<string, unknown>;

const BOM = '\uFEFF';

const pkg = (await Bun.file('datapackage.json').json()) as {
  version: string;
  counts: Record<string, number>;
  resources: Resource[];
};
const errors: string[] = [];
const fail = (msg: string) => errors.push(msg);

/** RFC 4180 rows. Our files use \n line ends and a UTF-8 BOM. */
function parseCsv(text: string) {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = '';
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') {
        cell += '"';
        i++;
      } else if (c === '"') quoted = false;
      else cell += c;
    } else if (c === '"') quoted = true;
    else if (c === ',') {
      row.push(cell);
      cell = '';
    } else if (c === '\n') {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = '';
    } else cell += c;
  }
  return rows;
}

/** Fields that are arrays in JSON are space-separated strings in CSV. */
const arrays = new Set(
  pkg.resources.flatMap((r) =>
    (r.schema?.fields ?? [])
      .filter((f) => f.type === 'array')
      .map((f) => `${r.name.replace(/-json$/, '')}.${f.name}`),
  ),
);

async function load(r: Resource): Promise<Row[]> {
  const bytes = await Bun.file(r.path).bytes();
  const text = new TextDecoder('utf-8', { ignoreBOM: true }).decode(bytes);
  if (r.format === 'json') return JSON.parse(text) as Row[];
  if (!text.startsWith(BOM)) fail(`${r.path}: no UTF-8 BOM`);
  const [head = [], ...body] = parseCsv(text.slice(1));
  const fields = r.schema?.fields ?? [];
  if (head.join() !== fields.map((f) => f.name).join()) fail(`${r.path}: header ${head.join()}`);
  return body.map((cells) =>
    Object.fromEntries(
      fields.map((f, i) => {
        const v = cells[i] ?? '';
        if (arrays.has(`${r.name.replace(/-csv$/, '')}.${f.name}`))
          return [f.name, v ? v.split(' ') : []];
        return [f.name, v === '' ? null : v];
      }),
    ),
  );
}

function checkRows(r: Resource, rows: Row[]) {
  const seen = new Set<unknown>();
  for (const row of rows) {
    const where = `${r.path} ${String(row.code)}`;
    if (seen.has(row.code)) fail(`${where}: duplicate code`);
    seen.add(row.code);
    for (const f of r.schema?.fields ?? []) {
      const v = row[f.name];
      const c = f.constraints ?? {};
      const empty = v === null || v === undefined || v === '' || (Array.isArray(v) && !v.length);
      if (empty) {
        if (c.required) fail(`${where}: ${f.name} is empty`);
        continue;
      }
      if (
        Array.isArray(v) !==
        (f.type === 'array' || arrays.has(`${r.name.replace(/-(csv|json)$/, '')}.${f.name}`))
      )
        fail(`${where}: ${f.name} has the wrong type`);
      const text = Array.isArray(v) ? v.join(' ') : String(v);
      if (c.pattern && !new RegExp(`^(?:${c.pattern})$`).test(text))
        fail(`${where}: ${f.name} "${String(v)}"`);
      if (c.enum && !c.enum.includes(String(v))) fail(`${where}: ${f.name} "${String(v)}"`);
      if (f.type === 'date' && !/^\d{4}-\d{2}-\d{2}$/.test(String(v)))
        fail(`${where}: ${f.name} "${String(v)}"`);
    }
  }
}

const tables: Record<string, Row[]> = {};
for (const r of pkg.resources.filter((x) => x.schema)) {
  const rows = await load(r);
  checkRows(r, rows);
  const name = r.name.replace(/-(csv|json)$/, '');
  if (rows.length !== pkg.counts[name])
    fail(`${r.path}: ${rows.length} rows, datapackage.json says ${pkg.counts[name]}`);
  if (r.format === 'csv') tables[`${name}.csv`] = rows;
  else tables[name] = rows;
}

for (const name of Object.keys(pkg.counts)) {
  if (JSON.stringify(tables[name]) !== JSON.stringify(tables[`${name}.csv`]))
    fail(`${name}: CSV and JSON differ`);
}

const codes = (name: string) => new Set((tables[name] ?? []).map((r) => r.code));
const provinces = codes('provinces');
const districts = codes('districts');
for (const d of tables.districts ?? []) {
  if (!provinces.has(d.province_code))
    fail(`district ${String(d.code)}: no province ${String(d.province_code)}`);
}
for (const s of tables.subdistricts ?? []) {
  if (!districts.has(s.district_code))
    fail(`subdistrict ${String(s.code)}: no district ${String(s.district_code)}`);
  if (!String(s.district_code).startsWith(String(s.province_code)))
    fail(`subdistrict ${String(s.code)}: parents differ`);
  for (const p of s.postal_codes as string[])
    if (!/^\d{5}$/.test(p)) fail(`subdistrict ${String(s.code)}: postal code "${p}"`);
}

type Tree = { code: string; districts: { code: string; subdistricts: Row[] }[] }[];
const tree = (await Bun.file('json/tree.json').json()) as Tree;
const key = (s: Row, district: unknown, province: unknown) =>
  JSON.stringify([s.code, district, province, s.postal_codes]);
const fromTree = tree.flatMap((p) =>
  p.districts.flatMap((d) => d.subdistricts.map((s) => key(s, d.code, p.code))),
);
const fromTable = (tables.subdistricts ?? []).map((s) => key(s, s.district_code, s.province_code));
if (JSON.stringify(fromTree) !== JSON.stringify(fromTable))
  fail('json/tree.json: differs from subdistricts');

const log = await Bun.file('CHANGELOG.md').text();
if (!log.includes(`\n## v${pkg.version}\n`)) fail(`CHANGELOG.md: no entry for v${pkg.version}`);

if (errors.length) {
  console.error(`${errors.length} problems:`);
  for (const e of errors.slice(0, 50)) console.error(`  ${e}`);
  process.exit(1);
}
console.log(
  `v${pkg.version}: ${Object.entries(pkg.counts)
    .map(([k, n]) => `${n} ${k}`)
    .join(', ')}, all checks pass`,
);
