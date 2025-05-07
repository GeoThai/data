# GeoThai Data - Version 3

Welcome to **GeoThai Data Version 3**! 🌏📊 This directory contains the latest and most modular version of the geographic data for Thailand. Version 3 introduces schema-based validation and decomposes the dataset into atomic, reusable structures optimized for performance and maintainability.

## 📁 Directory Structure

Version 3 is composed of structured JSON files, each validated against a corresponding schema. This modular architecture improves reliability and facilitates integration with various applications.

- **`provinces.json`**: Map of province data keyed by province code.
- **`districts.json`**: Map of district data keyed by district code.
- **`subdistricts.json`**: Map of subdistrict data keyed by subdistrict code.
- **`postal_codes.json`**: Map of postal code data keyed by postal code.
- **Name maps**:
  - `province_name_map.json`
  - `district_name_map.json`
  - `subdistrict_name_map.json`
- **Index maps**:
  - `province_index.json`
  - `district_index.json`
  - `subdistrict_index.json`
  - `postal_code_map.json`
- **Metadata**:
  - `metadata.json`
- **Schemas**:
  - JSON Schema definitions for validation (e.g., `provinces.schema.json`, `metadata.schema.json`, etc.)

## 📊 Data Details

### **Provinces**

**File**: [`provinces.json`](provinces.json)

Each province entry contains:

- `code`: Integer province code
- `name_en` / `name_th`: English and Thai names
- `districts`: List of district codes

### **Districts**

**File**: [`districts.json`](districts.json)

Each district entry includes:

- `code`: Integer district code
- `province_code`: Parent province code
- `name_en` / `name_th`: English and Thai names
- `subdistricts`: List of subdistrict codes

### **Subdistricts**

**File**: [`subdistricts.json`](subdistricts.json)

Each subdistrict entry includes:

- `code`: Integer subdistrict code
- `district_code`: Parent district code
- `province_code`: Parent province code
- `name_en` / `name_th`: English and Thai names
- `postal_code`: Associated postal code

### **Postal Codes**

**File**: [`postal_codes.json`](postal_codes.json)

Each postal code maps to one or more subdistrict codes.

### **Name Maps**

These files provide reverse mappings from Thai or English names to their respective IDs:

- [`province_name_map.json`](province_name_map.json)
- [`district_name_map.json`](district_name_map.json)
- [`subdistrict_name_map.json`](subdistrict_name_map.json)

### **Index Maps**

These files enable efficient lookup of hierarchical relationships:

- [`province_index.json`](province_index.json): List of province codes
- [`district_index.json`](district_index.json): Districts grouped by province code
- [`subdistrict_index.json`](subdistrict_index.json): Subdistricts grouped by district code
- [`postal_code_map.json`](postal_code_map.json): Subdistricts grouped by postal code

### **Metadata**

**File**: [`metadata.json`](metadata.json)

Contains versioning and summary statistics such as:

```json
{
  "version": "3.0.0",
  "last_updated": "YYYY-MM-DD HH:MM:SS",
  "source": "GeoThai Team (https://github.com/GeoThai/data.git)",
  "stats": {
    "provinces": 77,
    "districts": 928,
    "subdistricts": 7436,
    "postal_codes": 954
  }
}
```

## 📚 Documentation

For more context on the structure and usage of this repository, see the [main README](../../README.md). Each schema file can also be used to validate corresponding data programmatically.

## 📝 License

This dataset is licensed under the [MIT License](../../LICENSE). See the LICENSE file for full terms.

## 🙋‍♂️ Contact

Have questions or feedback? Reach out to us at [pyyupsk@proton.me](mailto:pyyupsk@proton.me).

Thank you for using GeoThai Data Version 3! 🚀
