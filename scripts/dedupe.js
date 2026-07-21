// Usage: node scripts/dedupe.js
// Detects duplicate questions across ALL files using the fingerprint field.
const fs = require("fs");
const path = require("path");

const DATA_DIRS = ["data/pyq", "data/subjects"];
const seen = new Map();
let dupes = 0;

for (const dir of DATA_DIRS) {
  for (const f of fs.readdirSync(dir).filter((f) => f.endsWith(".json"))) {
    const file = path.join(dir, f);
    const arr = JSON.parse(fs.readFileSync(file, "utf8"));
    arr.forEach((q, i) => {
      const fp = (q.fingerprint || "").trim().toLowerCase();
      if (!fp) return;
      if (seen.has(fp)) {
        dupes++;
        console.error(`DUPLICATE: ${file} [#${i}] (id: ${q.id}) == ${seen.get(fp)}`);
      } else {
        seen.set(fp, `${file} [#${i}] (id: ${q.id})`);
      }
    });
  }
}

if (dupes === 0) console.log(`OK: no duplicates (${seen.size} unique questions)`);
else console.error(`FAILED: ${dupes} duplicate(s) found`);
process.exit(dupes === 0 ? 0 : 1);
