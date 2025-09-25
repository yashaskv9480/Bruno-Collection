# SAP Bruno Collection

This Bruno collection provides a standardized way to interact with various SAP services using OAuth 2.0 client credentials flow for authentication.

## 🏗️ Collection Structure

```
SAP/
├── bruno.json              # Collection configuration
├── collection.bru          # Global collection settings
├── environments/           # Environment-specific variables
│   └── us30.bru           # US30 region environment
├── tools/
│   └── login.oauth.js     # Shared OAuth authentication logic
└── [service-folders]/     # Individual service folders
    ├── folder.bru         # Service-level auth configuration
    └── [api-files].bru    # Individual API endpoints
```

## Adding a New Service

Follow these steps to add a new service to the collection:

### Step 1: Create Service Folder

1. Create a new folder under `SAP/` with your service name (e.g., `myservice`)
2. Inside the folder, create a `folder.bru` file with the following template:

```bru
meta {
  name: myservice
  seq: 1
}

auth {
  mode: bearer
}

auth:bearer {
  token: {{myservice_accessToken}}
}

vars:pre-request {
  myservice_url: https://myservice-api.cfapps.{{region}}.hana.ondemand.com
}

script:pre-request {
  const tools = require('./tools/login.oauth');
  await tools.login("myservice");
}
```

### Step 2: Configure Environment Variables

Add your service credentials to the environment file (e.g., `environments/us30.bru`):

```bru
vars {
  region: us30
  authenticator: papmcloud
}
```

### Step 3: Create API Endpoints

Create individual `.bru` files for each API endpoint:

```bru
meta {
  name: Get Resource
  type: http
  seq: 1
}

get {
  url: {{myservice_url}}/api/resource
  body: none
  auth: inherit
}

settings {
  encodeUrl: true
}
```

### Adding New Environments

1. Create a new `.bru` file in the `environments/` folder
2. Configure region-specific variables:

```bru
vars {
  region: eu10
  authenticator: papmcloud
}

```

---
