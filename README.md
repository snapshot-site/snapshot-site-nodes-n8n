# n8n-nodes-snapshot-site

![Snapshot Site](assets/banner.png)

This is an n8n community node. It lets you use [Snapshot Site](https://snapshot-site.com) in your n8n workflows.

Snapshot Site is a screenshot, AI page-analysis, and visual-diff API for websites.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

[Installation](#installation)
[Operations](#operations)
[Credentials](#credentials)
[Compatibility](#compatibility)
[Usage](#usage)
[Development](#development)
[Resources](#resources)
[Version history](#version-history)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation, and install `n8n-nodes-snapshot-site`.

## Operations

The **Snapshot Site** node supports three operations:

| Operation   | Endpoint                  | Description                                                                            |
| ----------- | ------------------------- | ---------------------------------------------------------------------------------------- |
| Screenshot  | `POST /api/v2/screenshot` | Capture a screenshot of a webpage as PNG, JPEG, WebP, PDF, base64, or raw HTML            |
| Analyze     | `POST /api/v3/analyze`    | Capture a page and run AI-powered summary, topic, quality, and heading extraction on it   |
| Compare     | `POST /api/v3/compare`    | Capture a "before" and "after" page (or image) and return a pixel-diff comparison         |

## Credentials

The node authenticates with a **Snapshot Site API** credential:

1. Sign up and create an API key in the [Snapshot Site Console](https://console.snapshot-site.com).
2. In n8n, create a new **Snapshot Site API** credential and paste the key into **API Key**.
3. Leave **Base URL** as the default (`https://api.prod.ss.snapshot-site.com`) unless you're pointed at a self-hosted or staging instance.

## Compatibility

Requires n8n v1.0 or later. Tested against n8n's declarative node routing engine using `@n8n/node-cli` v0.38.

## Usage

### Screenshot

Set **Operation** to `Screenshot`, enter a **URL**, and optionally expand **Additional Fields** to set the format, viewport size, full-page capture, cookie-banner hiding, custom JavaScript, element hiding, language, or country.

### Analyze

Set **Operation** to `Analyze`, enter a **URL**, and optionally enable **Enable AI Summary** / **Enable Quality Check** in **Additional Fields** to get a content summary, topics, headings, and a quality report (blank-page/CAPTCHA detection, readability score) alongside the screenshot.

### Compare

Set **Operation** to `Compare`, enter a **Before URL** and **After URL** (each can be overridden with an **Image URL** in their respective **Options** to diff against an existing image instead of a live page), and adjust **Threshold** (0-1) to control how sensitive the mismatch detection is.

If you're new to n8n, see the [Try it out](https://docs.n8n.io/try-it-out/) documentation to get started.

## Development

```bash
npm install          # install dependencies
npm run build        # compile TypeScript and copy static files to dist/
npm run build:watch  # tsc in watch mode, for iterating without a full rebuild
npm run dev          # link this package into a local n8n and run it with hot reload
npm run lint         # lint against n8n's community node rules
npm run lint:fix     # same, auto-fixing what it can
npm test             # run the jest unit tests
npm run release      # bump version, changelog, tag, push (publishing itself happens in CI)
```

To manually try the published package end-to-end in a clean n8n instance (not linked to local source), rather than `npm run dev`:

```bash
nvm use 22.23.1       # n8n requires Node >=22.22
npx n8n               # then open http://localhost:5678 and install n8n-nodes-snapshot-site
                       # via Settings -> Community Nodes
```

Before submitting a release for n8n verification, run the same scanner n8n's Creator Portal uses:

```bash
npx @n8n/scan-community-package@latest n8n-nodes-snapshot-site
```

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
- [Snapshot Site API documentation](https://snapshot-site.com/api-docs)
- [Snapshot Site Console](https://console.snapshot-site.com)

## Version history

See [CHANGELOG.md](CHANGELOG.md).
