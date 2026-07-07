// ============================================================
// CHARACTER GENERATOR DATA
// Edit these arrays anytime — no coding knowledge needed.
// Just keep the same format: quotes around each name, commas between.
// ============================================================

// 1d6 — Race table
const RACES = [
  "Human",
  "Dwarf",
  "Dragonborn",
  "Halfling",
  "Tabaxi",
  "Tiefling",
];

// 1d12 — Class table (order matters: index 0 = roll of 1, etc.)
const CLASSES = [
  "Barbarian",
  "Bard",
  "Cleric",
  "Druid",
  "Fighter",
  "Monk",
  "Paladin",
  "Ranger",
  "Rogue",
  "Sorcerer",
  "Warlock",
  "Wizard",
];

// Subclass lists per class. The die size used for the subclass roll
// is automatically the LENGTH of each list (e.g. Bard has 6 entries -> 1d6,
// Cleric has 12 -> 1d12). Just edit the list contents/length and the bot adapts.
// Confirmed against your clearer sheet on 2026-07-07 — all counts verified.
const SUBCLASSES = {
  Barbarian: [
    "Path of the Berserker",
    "Path of the Totem Warrior",
    "Path of the Ancestral Guardian",
    "Path of the Storm Herald",
    "Path of the Zealot",
    "Path of the Beast",
    "Path of Wild Magic",
    "Path of the Giant",
  ],
  Bard: [
    "College of Lore",
    "College of Creation",
    "College of Glamour",
    "College of Swords",
    "College of Whispers",
    "College of Eloquence",
  ],
  Cleric: [
    "Life Domain",
    "Light Domain",
    "Nature Domain",
    "Tempest Domain",
    "Trickery Domain",
    "War Domain",
    "Knowledge Domain",
    "Forge Domain",
    "Grave Domain",
    "Peace Domain",
    "Twilight Domain",
    "Death Domain",
  ],
  Druid: [
    "Circle of the Land",
    "Circle of the Moon",
    "Circle of the Shepherd",
    "Circle of Dreams",
    "Circle of Stars",
    "Circle of Wildfire",
  ],
  Fighter: [
    "Champion",
    "Battle Master",
    "Eldritch Knight",
    "Arcane Archer",
    "Cavalier",
    "Samurai",
    "Psi Warrior",
    "Rune Knight",
  ],
  Monk: [
    "Way of the Open Hand",
    "Way of Shadow",
    "Way of the Four Elements",
    "Way of the Drunken Master",
    "Way of the Kensei",
    "Way of the Sun Soul",
    "Way of Mercy",
    "Way of the Astral Self",
  ],
  Paladin: [
    "Oath of Devotion",
    "Oath of the Ancients",
    "Oath of Vengeance",
    "Oath of Conquest",
    "Oath of Redemption",
    "Oath of Glory",
    "Oath of the Watchers",
    "Oathbreaker",
  ],
  Ranger: [
    "Hunter",
    "Beast Master",
    "Gloom Stalker",
    "Horizon Walker",
    "Monster Slayer",
    "Fey Wanderer",
    "Swarmkeeper",
    "Drakewarden",
  ],
  Rogue: [
    "Thief",
    "Assassin",
    "Arcane Trickster",
    "Mastermind",
    "Swashbuckler",
    "Soulknife",
    "Scout",
    "Phantom",
  ],
  Sorcerer: [
    "Draconic Bloodline",
    "Divine Soul",
    "Shadow Magic",
    "Storm Sorcery",
    "Aberrant Mind",
    "Clockwork Soul",
  ],
  Warlock: [
    "The Archfey",
    "The Fiend",
    "The Great Old One",
    "The Celestial",
    "The Hexblade",
    "The Fathomless",
    "The Genie",
    "The Undying",
  ],
  Wizard: [
    "School of Abjuration",
    "School of Conjuration",
    "School of Divination",
    "Order of Scribes",
    "School of Evocation",
    "School of Illusion",
    "School of Necromancy",
    "School of Transmutation",
    "Bladesinging",
    "War Magic",
  ],
};

// 1d20 — Background table
const BACKGROUNDS = [
  "Acolyte",
  "Sage",
  "Magic Student",
  "Archeologist",
  "Scribe",
  "Charlatan",
  "Spy",
  "Courtier",
  "Noble",
  "Entertainer",
  "Gambler",
  "Artisan",
  "Merchant",
  "Shipwright",
  "Farmer",
  "Fisherman",
  "Hermit",
  "Outlander",
  "Urchin",
  "Folk Hero",
];

module.exports = { RACES, CLASSES, SUBCLASSES, BACKGROUNDS };
