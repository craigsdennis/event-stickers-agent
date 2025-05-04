# Event Sticker Selfie

Let's take a selfie together kinda!

This uses [Cloudflare Agent Framework](https://agents.cloudflare.com) to create a multi-player app that uses Agent State and [Replicate](https://replicate.com) to make sticker selfies of specific events.

## Develop

Copy [./dev.vars.example](./.dev.vars.example) to .dev.vars

```bash
npm run build
npm run dev
```

## Deploy

```bash
npx wrangler secret bulk .dev.vars
```

```bash
npm run deploy
```
