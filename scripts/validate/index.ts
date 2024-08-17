import fs from 'fs'
import path from 'path'
import Ajv from 'ajv'
import chalk from 'chalk'
import figures from 'figures'

const ajv = new Ajv({ allErrors: true })

const readJsonFile = (filePath: string): object => {
    try {
        const data = fs.readFileSync(filePath, 'utf-8')
        return JSON.parse(data)
    } catch (err) {
        console.error(
            `${chalk.red(figures.cross)} ${filePath} JSON file not found.`
        )
        throw err
    }
}

const validate = (
    version: string,
    dataDir: string,
    errors: { [key: string]: string[] }
) => {
    const schemaDir = path.join(process.cwd(), 'schemas', version)

    if (!fs.existsSync(schemaDir)) {
        console.error(
            `${chalk.red(figures.cross)} ${version} JSON schema directory not found.`
        )
        return
    }

    console.log(
        `\n${chalk.blue(figures.bullet)} Validating ${chalk.yellow.bold(version)} JSON schemas...`
    )

    fs.readdirSync(dataDir).forEach((file) => {
        if (file.endsWith('.json')) {
            const filePath = path.join(dataDir, file)
            const schemaPath = path.join(
                schemaDir,
                file.replace('.json', '.schema.json')
            )

            if (fs.existsSync(schemaPath)) {
                const data = readJsonFile(filePath)
                const schema = readJsonFile(schemaPath)
                const validate = ajv.compile(schema)
                const valid = validate(data)

                if (valid) {
                    console.log(
                        `${chalk.green(figures.tick)} ${chalk.green(filePath.replace(dataDir + path.sep, ''))} JSON schema is ${chalk.green('valid')}.`
                    )
                } else {
                    const errorsList = validate.errors
                        ? ajv.errorsText(validate.errors, { separator: ', ' })
                        : 'Unknown validation error'
                    errors[version] = errors[version] || []
                    errors[version].push(`${file}: ${errorsList}`)
                    console.error(
                        `${chalk.red(figures.cross)} ${chalk.green(filePath.replace(dataDir + path.sep, ''))} JSON schema is ${chalk.red('invalid')}.`
                    )
                }
            } else {
                console.log(
                    `${chalk.yellow(figures.warning)} ${chalk.green(filePath.replace(dataDir + path.sep, ''))} JSON schema not found.`
                )
            }
        }
    })
}

const main = async () => {
    console.log(
        `${chalk.blue(figures.hamburger)} Validating JSON schemas ${chalk.blue(figures.hamburger)}`
    )

    const versions = await fs.promises.readdir(path.join(process.cwd(), 'data'))
    const errors: { [key: string]: string[] } = {}
    const startTime = Date.now()

    if (versions.length === 0) {
        console.error(
            `${chalk.red(figures.cross)} No data found in 'data' directory.`
        )
        return
    }

    for (const version of versions) {
        validate(version, path.join(process.cwd(), 'data', version), errors)
    }

    const endTime = Date.now()
    const processTime = ((endTime - startTime) / 1000).toFixed(1)
    const totalErrors = Object.values(errors).flat().length

    console.log('\n=================================')
    if (totalErrors === 0) {
        console.log(
            `${chalk.green(figures.hamburger)} ${chalk.green('All JSON schemas are valid')} ${chalk.green(figures.hamburger)}`
        )
    } else {
        console.log(
            `${chalk.red(figures.hamburger)} ${chalk.red('Some JSON schemas are invalid')} ${chalk.red(figures.hamburger)}`
        )
        Object.entries(errors).forEach(([version, errs]) => {
            errs.forEach((err) => {
                console.log(
                    `  ${chalk.red(figures.cross)} ${chalk.yellow.bold(version)}: ${err}`
                )
            })
        })
        process.exit(1)
    }
    console.log(`\nVersions: ${versions.length} (${versions.join(', ')})`)
    console.log(`Errors: ${totalErrors}`)
    console.log(`Process time: ${processTime}s`)
}

main()
