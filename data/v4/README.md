# GeoThai Data - Version 4

Welcome to **GeoThai Data Version 4**! 🌏📊 This directory contains the ultra-fast lookup optimized version of geographic data for Thailand. Version 4 is specifically designed for maximum performance with denormalized structures, embedded hierarchies, and multiple access patterns.

## 📁 Directory Structure

- **`geo.json`**: Complete hierarchical structure with all provinces, districts, and subdistricts embedded
- **`provinces_flat.json`**: Provinces keyed by province code with full nested data
- **`postal_lookup.json`**: Postal codes mapped to complete address information
- **`search_index.json`**: Optimized search index for name-based queries
- **`metadata.json`**: Version information and statistics

## 📊 Data Details

### **geo.json**

**File**: [`geo.json`](geo.json)

**Description**: Complete array of all provinces with fully embedded districts and subdistricts. This is the most comprehensive single file for accessing all geographic data.

**Example Structure:**

```json
[
  {
    "code": 10,
    "name_en": "Bangkok",
    "name_th": "กรุงเทพมหานคร",
    "name_en_lower": "bangkok",
    "name_th_lower": "กรุงเทพมหานคร",
    "districts": [
      {
        "code": 1001,
        "name_en": "Phra Nakhon",
        "name_th": "พระนคร",
        "name_en_lower": "phra nakhon",
        "name_th_lower": "พระนคร",
        "province_code": 10,
        "subdistricts": [
          {
            "code": 100101,
            "name_en": "Phra Borom Maha Ratchawang",
            "name_th": "พระบรมมหาราชวัง",
            "name_en_lower": "phra borom maha ratchawang",
            "name_th_lower": "พระบรมมหาราชวัง",
            "district_code": 1001,
            "province_code": 10,
            "postal_code": 10200
          }
          // Additional subdistricts...
        ]
      }
      // Additional districts...
    ]
  }
  // Additional provinces...
]
```

### **provinces_flat.json**

**File**: [`provinces_flat.json`](provinces_flat.json)

**Description**: Object/map structure with provinces keyed by province code. Each province contains full nested districts and subdistricts for fast O(1) lookups.

**Example Structure:**

```json
{
  "10": {
    "code": 10,
    "name_en": "Bangkok",
    "name_th": "กรุงเทพมหานคร",
    "name_en_lower": "bangkok",
    "name_th_lower": "กรุงเทพมหานคร",
    "districts": [...]
  }
  // Additional provinces...
}
```

### **postal_lookup.json**

**File**: [`postal_lookup.json`](postal_lookup.json)

**Description**: Map of postal codes to complete address information. Each postal code includes all associated provinces, districts, and subdistricts.

**Example Structure:**

```json
{
  "10200": {
    "postal_code": 10200,
    "addresses": [
      {
        "province_code": 10,
        "province_name_en": "Bangkok",
        "province_name_th": "กรุงเทพมหานคร",
        "district_code": 1001,
        "district_name_en": "Phra Nakhon",
        "district_name_th": "พระนคร",
        "subdistrict_code": 100101,
        "subdistrict_name_en": "Phra Borom Maha Ratchawang",
        "subdistrict_name_th": "พระบรมมหาราชวัง"
      }
      // Additional addresses...
    ]
  }
  // Additional postal codes...
}
```

### **search_index.json**

**File**: [`search_index.json`](search_index.json)

**Description**: Optimized search index with lowercase normalized keys for fast name-based lookups. Supports both English and Thai names with case-insensitive matching.

**Example Structure:**

```json
{
  "provinces": {
    "bangkok": {
      "code": 10,
      "name_en": "Bangkok",
      "name_th": "กรุงเทพมหานคร"
    },
    "กรุงเทพมหานคร": {
      "code": 10,
      "name_en": "Bangkok",
      "name_th": "กรุงเทพมหานคร"
    }
    // Additional province entries...
  },
  "districts": {
    "phra nakhon|10": {
      "code": 1001,
      "name_en": "Phra Nakhon",
      "name_th": "พระนคร",
      "province_code": 10
    }
    // Additional district entries...
  },
  "subdistricts": {
    "phra borom maha ratchawang|1001": {
      "code": 100101,
      "name_en": "Phra Borom Maha Ratchawang",
      "name_th": "พระบรมมหาราชวัง",
      "district_code": 1001,
      "province_code": 10
    }
    // Additional subdistrict entries...
  }
}
```

**Note**: District and subdistrict keys include parent codes (e.g., `name|province_code` for districts) to handle duplicate names across different provinces.

### **metadata.json**

**File**: [`metadata.json`](metadata.json)

**Description**: Contains version information, update timestamp, and comprehensive statistics.

**Example Structure:**

```json
{
  "version": "4.0.0",
  "last_updated": "2025-10-15T11:49:41.851Z",
  "source": "GeoThai Team (https://github.com/GeoThai/data.git)",
  "stats": {
    "provinces": 77,
    "districts": 928,
    "subdistricts": 7436,
    "postal_codes": 954
  },
  "description": "Version 4: Ultra-fast lookup optimized structure with denormalized data, embedded hierarchies, and multiple access patterns",
  "features": [
    "Denormalized hierarchical structure for minimal lookups",
    "Embedded full province/district/subdistrict relationships",
    "Fast postal code to complete address lookup",
    "Case-insensitive search index with normalized keys",
    "Single-file operations for common queries",
    "Pre-computed lowercase keys for search optimization"
  ]
}
```

## 📚 Documentation

For more context on the structure and usage of this repository, see the [main README](../../README.md). Each schema file can also be used to validate corresponding data programmatically.

## 📝 License

This dataset is licensed under the [MIT License](../../LICENSE). See the LICENSE file for full terms.

## 🙋‍♂️ Contact

Have questions or feedback? Reach out to us at [geothai@fasu.dev](mailto:geothai@fasu.dev).

Thank you for using GeoThai Data Version 4! 🚀
