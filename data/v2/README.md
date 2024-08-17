# GeoThai Data - Version 2

Welcome to **GeoThai Data Version 2**! 🌏📊 This directory contains the updated geographic data for Thailand in Version 2 format. The data is organized into files that offer a more integrated structure with additional postal code information.

## 📁 Directory Structure

-   **`provinces.json`**: Contains data about Thai provinces, including associated districts.
-   **`districts.json`**: Contains data about districts within each province, including associated subdistricts.
-   **`subdistricts.json`**: Contains data about subdistricts within each district.
-   **`postal_codes.json`**: Contains data about postal codes and their associated areas.
-   **`metadata.json`**: Provides metadata for this version of the data.

## 📊 Data Details

### **Provinces**

**File**: [`provinces.json`](provinces.json)

**Description**: This file includes details about each province in Thailand, along with the IDs of districts within each province.

**Example Structure:**

```json
[
    {
        "id": 10,
        "en": "Bangkok",
        "th": "กรุงเทพมหานคร",
        "districts": [1001, 1002, 1003]
    }
    // Additional provinces...
]
```

### **Districts**

**File**: [`districts.json`](districts.json)

**Description**: This file contains information about districts within each province, including the IDs of subdistricts within each district.

**Example Structure:**

```json
[
    {
        "id": 1001,
        "province_id": 10,
        "en": "Phra Nakhon",
        "th": "พระนคร",
        "subdistricts": [100101, 100102, 100103]
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
        "id": 100101,
        "district_id": 1001,
        "en": "Phra Borom Maha Ratchawang",
        "th": "พระบรมมหาราชวัง",
        "postal_code": 10200
    }
    // Additional subdistricts...
]
```

### **Postal Codes**

**File**: [`postal_codes.json`](postal_codes.json)

**Description**: This file includes postal codes and the areas (subdistrict IDs) associated with each postal code.

**Example Structure:**

```json
[
    {
        "postal_code": 10200,
        "areas": [100101, 100102, 100201]
    },
    {
        "postal_code": 10300,
        "areas": [100202, 100203, 100301]
    }
    // Additional postal codes...
]
```

### **Metadata**

**File**: [`metadata.json`](metadata.json)

**Description**: This file contains metadata about the dataset, including version information, last update timestamp, and total counts.

**Example Structure:**

```json
{
    "version": "2.0.0",
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

Thank you for using GeoThai Data Version 2! 🌟
