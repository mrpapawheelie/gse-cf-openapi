# Cloudflare Worker for Google Programmable Search

This Cloudflare Worker leverages OpenAPI 3.1 and [itty-router-openapi](https://github.com/cloudflare/itty-router-openapi) to create a powerful and efficient interface for Google Programmable Search. Designed for rapid development and deployment, this example project serves as an ideal starting point for developers looking to integrate Google's search capabilities into their applications with the scalability and reliability of Cloudflare Workers.

By automatically generating the `openapi.json` schema from your code and validating incoming requests against defined parameters, this project simplifies the process of creating an OpenAPI-compliant interface for web search functionalities. Whether you're building an internal tool or a customer-facing application, this worker provides a robust foundation for your search-related features.

## Get started

1. Sign up for [Cloudflare Workers](https://workers.dev). The free tier is sufficient for most use cases.
2. Clone this project.
3. Install dependencies:

# Installation Instructions

Choose one of the following package managers to install dependencies:

### Yarn
```bash
yarn
```

### Bun
```bash
bun install
```

### NPM
```bash
npm install
```

### PNPM
```bash
pnpm install
```

## Update Info
- Update the contact info to your information at src/index.ts
- Update the server url to your Cloudflare url after deploying in src/index.ts

- Authenticate Cloudflare 
```bash
npx wrangler login
```
- Setup a Google Programmable Search at: [https://programmablesearchengine.google.com/](https://programmablesearchengine.google.com/)
- Get your Google Programmable Search ID from the overview page and run
```bash
npx wrangler secret put SEARCH_ENGINE_ID
```
- Get an API Key from Google for GSE at: [https://developers.google.com/custom-search/v1/introduction](https://developers.google.com/custom-search/v1/introduction) and run
```bash
npx wrangler secret put GSE_API_KEY
```
- Ship It! 
```bash
npx wrangler deploy
```
to deploy it.
- Visit the URL to view the OpenAPI testing tool.

## Creating a GPT
- Once your API is on cloudflare and you've tested it works by visiting the main url, click on the openai.json link (format should be cloudflaredomain/openapi.json)
- Open up ChatGPT, and go to Explore GPTs on left and click Create at the top right.
- Click configure and scroll down, choose what capabilities you want, then click create new action.
- Click import from URL, and paste in your openapi.json url, for GPT to automatically import. 
- make sure you link to a privacy policy page. 
- Then click the back arrow and click create to instruct GPT on the setup.

### How-to Video
[https://app.arcade.software/share/tZ8NPMNwzkbG6V3bXS9p](https://app.arcade.software/share/tZ8NPMNwzkbG6V3bXS9p)

