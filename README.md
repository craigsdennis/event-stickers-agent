# Event Sticker Selfie

Let's take a selfie together, kinda!

This uses [Cloudflare Agent Framework](https://agents.cloudflare.com) to create a multi-player app that uses Agent State and [Replicate](https://replicate.com) to make sticker selfies of specific events.

## Resources

- 👀 [Agents](https://agents.cloudflare.com)
- 📚 [MCP]([https](https://developers.cloudflare.com/agents/model-context-protocol/))
- 📖 [Cloudflare Hackathon Helper](https://shrty.dev/hackathon-helper)

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
