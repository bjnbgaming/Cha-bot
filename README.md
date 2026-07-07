# D&D Random Character Generator — Discord Bot

Slash command `/rollcharacter` rolls:
- **Race** (1d6)
- **Class** (1d12)
- **Subclass** — die size automatically matches how many subclasses that class has (e.g. Bard = 1d6, Cleric = 1d12, Wizard = 1d10)
- **Background** (1d20)

All results come back in one clean embed.

All tables are confirmed against your sheet as of 2026-07-07, including Wizard's full 10-option list (Order of Scribes, Bladesinging, and War Magic included).

To edit any table: just add/remove/reorder items in the arrays in `data.js`. No coding needed — the die size updates automatically based on list length.

## Setup (one-time)

### 1. Create your bot application
1. Go to https://discord.com/developers/applications → **New Application**
2. Go to the **Bot** tab → click **Reset Token** → copy it (this is your `DISCORD_TOKEN`, keep it secret)
3. Under **Privileged Gateway Intents**, you don't need to enable any of them for this bot
4. Go to **OAuth2 → URL Generator**, check scopes `bot` and `applications.commands`, then under Bot Permissions check `Send Messages` and `Use Slash Commands`. Open the generated URL to invite the bot to your server.
5. Copy your **Application ID** from the General Information tab (this is your `DISCORD_CLIENT_ID`)

### 2. Configure environment variables
```
cp .env.example .env
```
Then fill in `DISCORD_TOKEN` and `DISCORD_CLIENT_ID` in `.env`. Optionally add `DISCORD_GUILD_ID` (right-click your server icon with Developer Mode on → Copy Server ID) so your slash command registers **instantly** instead of waiting up to 1 hour for global rollout.

### 3. Install & run
```
npm install
npm start
```

You should see `Logged in as YourBotName#0000` in the console. Run `/rollcharacter` in your Discord server.

## Testing the tables without Discord
```
npm run dryrun
```
This runs 5000 simulated rolls and confirms every class maps to a valid subclass die/list — useful after you edit `data.js`.

## Hosting it 24/7 (so it stays online)

Right now this only runs while your terminal is open. To keep it running permanently, deploy to a free/cheap host:

**Railway (recommended, easiest)**
1. Push this folder to a GitHub repo (keep `.env` out of it — it's already safe since you're using `.env.example`)
2. Go to https://railway.app → New Project → Deploy from GitHub repo
3. In Railway's dashboard, add the same environment variables from your `.env` file under **Variables**
4. Railway auto-runs `npm start` — done, it's live 24/7

**Replit (also easy, has a free tier with some sleep limitations)**
1. Import this folder as a new Repl (Node.js template)
2. Add your env vars in Replit's **Secrets** tab
3. Click Run

## Roadmap note (website integration)

Since you mentioned wanting this on a website with purchased tokens eventually: the `generateCharacter()` function in `index.js` is already isolated from the Discord-specific code, so it can be lifted directly into a web backend (e.g. a Next.js API route) later — the roll logic doesn't need to change, only how it's triggered and how results are displayed/gated behind your token/credit system.
