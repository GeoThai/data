# GeoThai Data Repository

Welcome to the **GeoThai Data Repository**! 🌏📊 This repository contains geographic data for Thailand, organized into four versions: v1, v2, v3, and v4. Each version provides different structures and datasets to support various geographic analyses and applications.

## 📂 Repository Structure

This repository is organized into four main versions, each with its own set of files:

- **[v1](data/v1/README.md)**: Contains individual JSON files for provinces, districts, and subdistricts.
- **[v2](data/v2/README.md)**: Features a more integrated structure with nested relationships and additional postal code data.
- **[v3](data/v3/README.md)**: Introduces indexed mappings ideal for optimized lookups and programmatic use.
- **[v4](data/v4/README.md)**: Ultra-fast lookup optimized structure with denormalized data and embedded hierarchies.

## 🗺️ Data Overview

### **Version 1 (v1)**

This version includes separate files for:

- **Provinces**: `data/v1/provinces.json`
- **Districts**: `data/v1/districts.json`
- **Subdistricts**: `data/v1/subdistricts.json`

For more details, refer to the [v1 README](data/v1/README.md).

### **Version 2 (v2)**

This version provides a more integrated structure with:

- **Provinces**: `data/v2/provinces.json`
- **Districts**: `data/v2/districts.json`
- **Subdistricts**: `data/v2/subdistricts.json`
- **Postal Codes**: `data/v2/postal_codes.json`

For more details, refer to the [v2 README](data/v2/README.md).

### **Version 3 (v3)**

This version includes all core data with improved indexing and name/code maps:

- **Provinces**: `data/v3/provinces.json`
- **Districts**: `data/v3/districts.json`
- **Subdistricts**: `data/v3/subdistricts.json`
- **Postal Codes**: `data/v3/postal_codes.json`
- **Index Maps**: `data/v3/*_index.json`
- **Name Maps**: `data/v3/*_name_map.json`
- **Code Maps**: `data/v3/*_code_map.json`
- **Metadata**: `data/v3/metadata.json`

For more details, refer to the [v3 README](data/v3/README.md).

### **Version 4 (v4)**

This version provides ultra-fast lookup optimization with fully denormalized data:

- **Complete Hierarchy**: `data/v4/geo.json`
- **Provinces by Code**: `data/v4/provinces_flat.json`
- **Postal Code Lookup**: `data/v4/postal_lookup.json`
- **Search Index**: `data/v4/search_index.json`
- **Metadata**: `data/v4/metadata.json`

For more details, refer to the [v4 README](data/v4/README.md).

## 📝 Metadata

Each version includes a `metadata.json` file with:

- **Version**: The data version.
- **Last Updated**: The timestamp of the last update.
- **Source**: GeoThai [GitHub Repository](https://github.com/GeoThai/data).
- **Total Counts**: Number of provinces, districts, subdistricts, and postal codes (available in v2+).

## 🔧 Usage

To use the data, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/GeoThai/data.git
   cd data
   ```

   **Note**: Ensure you have [Git](https://git-scm.com/) installed on your system.

2. **Select the version**:
   Choose `v1`, `v2`, `v3`, or `v4` based on your needs:

   - **v1**: Simple flat files for basic use cases
   - **v2**: Nested structure with postal codes
   - **v3**: Optimized with indexes and maps
   - **v4**: Ultra-fast denormalized structure for high-performance applications

3. **Access Data**:
   Navigate to the relevant directory and access the JSON files as required.

## 📝 License

This project is licensed under the [MIT License](LICENSE). See the LICENSE file for more details.

## 🙋‍♂️ Contact

For any questions, issues, or feedback, please contact us at [geothai@fasu.dev](mailto:geothai@fasu.dev).

Thank you for using the GeoThai Data Repository! 🌟
