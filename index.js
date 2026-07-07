// ============================================================
// D&D Random Character Generator — Discord Bot
// Slash command: /rollcharacter
// Rolls Race (d6), Class (d12), Subclass (die size = # of subclass
// options for that class), and Background (d20).
// ============================================================

const {
  Client,
  GatewayIntentBits,
  REST,
  Routes,
  SlashCommandBuilder,
  EmbedBuilder,
} = require("discord.js");
require("dotenv").config();

const { RACES, CLASSES, SUBCLASSES, BACKGROUNDS } = require("./data");

const TOKEN = process.env.DISCORD_TOKEN;
const CLIENT_ID = process.env.DISCORD_CLIENT_ID;

if (!TOKEN || !CLIENT_ID) {
  console.error(
    "Missing DISCORD_TOKEN or DISCORD_CLIENT_ID. Copy .env.example to .env and fill them in."
  );
  process.exit(1);
}

// ---- dice helper ----
function rollDie(sides) {
  return Math.floor(Math.random() * sides) + 1;
}

// ---- core generation logic ----
function generateCharacter() {
  const raceRoll = rollDie(RACES.length);
  const race = RACES[raceRoll - 1];

  const classRoll = rollDie(CLASSES.length);
  const cls = CLASSES[classRoll - 1];

  const subclassList = SUBCLASSES[cls] || [];
  const subclassDie = subclassList.length || 1;
  const subclassRoll = subclassList.length ? rollDie(subclassDie) : 0;
  const subclass = subclassList.length
    ? subclassList[subclassRoll - 1]
    : "N/A";

  const bgRoll = rollDie(BACKGROUNDS.length);
  const background = BACKGROUNDS[bgRoll - 1];

  return {
    race,
    raceRoll,
    raceDie: RACES.length,
    cls,
    classRoll,
    classDie: CLASSES.length,
    subclass,
    subclassRoll,
    subclassDie,
    background,
    bgRoll,
    bgDie: BACKGROUNDS.length,
  };
}

// ---- slash command registration ----
const commands = [
  new SlashCommandBuilder()
    .setName("rollcharacter")
    .setDescription("Roll a random Race, Class, Subclass, and Background"),
].map((c) => c.toJSON());

async function registerCommands() {
  const rest = new REST({ version: "10" }).setToken(TOKEN);
  // Global registration (can take up to 1hr to propagate on first deploy).
  // For instant testing in a single server, set DISCORD_GUILD_ID in .env
  // and it will register per-guild instead (instant).
  const guildId = process.env.DISCORD_GUILD_ID;
  if (guildId) {
    await rest.put(
      Routes.applicationGuildCommands(CLIENT_ID, guildId),
      { body: commands }
    );
    console.log(`Registered commands to guild ${guildId} (instant).`);
  } else {
    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
    console.log("Registered global commands (may take up to 1hr to appear).");
  }
}

// ---- bot client ----
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName !== "rollcharacter") return;

  const r = generateCharacter();

  const embed = new EmbedBuilder()
    .setTitle("🎲 Random Character Result")
    .setColor(0x5865f2)
    .addFields(
      {
        name: "Race",
        value: `**${r.race}** (rolled ${r.raceRoll} on 1d${r.raceDie})`,
      },
      {
        name: "Class",
        value: `**${r.cls}** (rolled ${r.classRoll} on 1d${r.classDie})`,
      },
      {
        name: "Subclass",
        value: `**${r.subclass}** (rolled ${r.subclassRoll} on 1d${r.subclassDie})`,
      },
      {
        name: "Background",
        value: `**${r.background}** (rolled ${r.bgRoll} on 1d${r.bgDie})`,
      }
    )
    .setFooter({ text: `Requested by ${interaction.user.username}` });

  await interaction.reply({ embeds: [embed] });
});

registerCommands()
  .then(() => client.login(TOKEN))
  .catch((err) => {
    console.error("Failed to register commands:", err);
    process.exit(1);
  });
