# GeoThai Data - Version 1

Welcome to **GeoThai Data Version 1**! 🌏📊 This directory contains geographic data for Thailand in Version 1 format. The data is organized into separate JSON files for provinces, districts, and subdistricts.

## 📁 Directory Structure

-   **`provinces.json`**: Contains data about Thai provinces.
-   **`districts.json`**: Contains data about districts within each province.
-   **`subdistricts.json`**: Contains data about subdistricts within each district.
-   **`metadata.json`**: Provides metadata for this version of the data.

## 📊 Data Details

### **Provinces**

**File**: [`provinces.json`](provinces.json)

**Description**: This file includes details about each province in Thailand.

**Example Structure:**

```json
[
    {
        "id": 1,
        "province_id": 10,
        "province_name_en": "Bangkok",
        "province_name_th": "กรุงเทพมหานคร"
    }
    // Additional provinces...
]
```

### **Districts**

**File**: [`districts.json`](districts.json)

**Description**: This file contains information about districts within each province.

**Example Structure:**

```json
[
    {
        "id": 1,
        "province_id": 10,
        "district_id": 1001,
        "district_name_en": "Phra Nakhon",
        "district_name_th": "พระนคร",
        "postal_code": 10200
    }
    // Additional districts...
]
```

### **Subdistricts**

**File**: [`subdistricts.json`](subdistricts.json)

**Description**: This file provides details about subdistricts within each district.

**Example Structure:**

```json
[
    {
        "id": 1,
        "province_id": 10,
        "district_id": 1001,
        "subdistrict_id": 100101,
        "subdistrict_name_en": "Phra Borom Maha Ratchawang",
        "subdistrict_name_th": "พระบรมมหาราชวัง",
        "postal_code": 10200
    }
    // Additional subdistricts...
]
```

### **Metadata**

**File**: [`metadata.json`](metadata.json)

**Description**: This file contains metadata about the dataset, including version information, last update timestamp, and total counts.

**Example Structure:**

```json
{
    "version": "1.0.0",
    "last_updated": "YYYY-MM-DD HH:MM:SS",
    "source": "GeoThai https://github.com/GeoThai/data",
    "total_provinces": 77,
    "total_districts": 928,
    "total_subdistricts": 7436
}
```

## 📚 Documentation

For more details on the overall repository and other versions of the data, visit the main [GeoThai Data README](../../README.md).

## 📝 License

This dataset is licensed under the [MIT License](../../LICENSE). See the LICENSE file in the root directory for more details.

## 🙋‍♂️ Contact

For any questions or feedback, please reach out to us at [pyyupsk@proton.me](mailto:pyyupsk@proton.me).

Thank you for using GeoThai Data Version 1! 🌟
