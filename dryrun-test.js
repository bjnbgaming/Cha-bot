// Validates the table logic locally — no Discord token needed.
// Run: node dryrun-test.js
const { RACES, CLASSES, SUBCLASSES, BACKGROUNDS } = require("./data");

function rollDie(sides) {
  return Math.floor(Math.random() * sides) + 1;
}

function generateCharacter() {
  const raceRoll = rollDie(RACES.length);
  const race = RACES[raceRoll - 1];
  const classRoll = rollDie(CLASSES.length);
  const cls = CLASSES[classRoll - 1];
  const subclassList = SUBCLASSES[cls] || [];
  const subclassDie = subclassList.length || 1;
  const subclassRoll = subclassList.length ? rollDie(subclassDie) : 0;
  const subclass = subclassList.length ? subclassList[subclassRoll - 1] : "N/A";
  const bgRoll = rollDie(BACKGROUNDS.length);
  const background = BACKGROUNDS[bgRoll - 1];
  return { race, cls, subclass, subclassDie, background };
}

console.log("=== Sanity check: every class has a valid subclass list ===");
for (const cls of CLASSES) {
  const list = SUBCLASSES[cls];
  if (!list || list.length === 0) {
    console.log(`⚠️  ${cls}: NO SUBCLASS LIST FOUND`);
  } else {
    console.log(`${cls}: ${list.length} subclasses -> uses 1d${list.length}`);
  }
}

console.log("\n=== 10 sample rolls ===");
for (let i = 0; i < 10; i++) {
  const r = generateCharacter();
  console.log(
    `${r.race} | ${r.cls} (1d${r.subclassDie}) | ${r.subclass} | ${r.background}`
  );
}

console.log("\n=== Stress test: 5000 rolls, checking for crashes/undefined ===");
let errors = 0;
for (let i = 0; i < 5000; i++) {
  const r = generateCharacter();
  if (!r.race || !r.cls || !r.subclass || !r.background || r.subclass === "undefined") {
    errors++;
    console.log("BAD ROLL:", r);
  }
}
console.log(errors === 0 ? "✅ All 5000 rolls produced valid results." : `❌ ${errors} bad rolls found.`);
