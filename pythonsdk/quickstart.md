## Quick Start

This short guide shows you how to set up the SDK, ingest data, and run your first query.

For a step-by-step walkthrough using real example data, see the [QuickStart API/SDK Guide](/get-started/quickstart-api).

### 1. Install

[Install the DataLinks SDK](/pythonsdk/installation) if you haven't already.

### 2. Configure

Ensure the required environment variables are set:

- `HOST`
- `DL_API_KEY`
- `NAMESPACE`
- `OBJECT_NAME` (optional)

Alternatively, you can use a `.env` file in the root of your project.

### 3. Ingest and query

```python
from datalinks.api import DataLinksAPI, DLConfig

# Initialize configuration
config = DLConfig.from_env()

# Instantiate API client
client = DataLinksAPI(config=config)

# Sample rows
rows = [
    {"brand": "Gilette", "category": "Razor", "product": "Heated Razor"},
    {"brand": "Oral-B",  "category": "Electric Toothbrush", "product": "iO Series 10"},
]

# Ingest pre-structured rows directly (no pipeline required)
result = client.ingest(data=rows)

# Query data
data = client.query_data(include_metadata=False)
print(data)
```

### 4. CLI Usage

The SDK also provides a built-in CLI that can be extended:

```shell
datalinks-client [-h] --verbose <input-folder>
```
