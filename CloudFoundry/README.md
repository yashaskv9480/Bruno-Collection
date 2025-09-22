# Cloud Foundry APIs

This folder contains Cloud Foundry API collections for Bruno API client.

## Overview

These API collections were generated using **Comet** from the official Cloud Foundry API documentation:

- **v2 APIs**: https://v2-apidocs.cloudfoundry.org/
- **v3 APIs**: https://v3-apidocs.cloudfoundry.org/version/3.202.0/index.html#introduction/

## Structure

- `v2/` - Cloud Foundry API v2 endpoints (deprecated but stable)
- `v3/` - Cloud Foundry API v3 endpoints (current version)

## To use

- **Authentication**: Add your `username` and `password` in the `.env` file. The `grant_type=password` flow is used to generate a token, which is then attached as a Bearer Token for all API requests.
