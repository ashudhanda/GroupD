// Usage: node scripts/stats.js
// Prints question counts per file, per subject, and overall progress toward 10K.
const fs = require("fs");
const path = require("path");

const TARGETS = {
  "haryana-gk": 2800,
  "general-awareness": 1500,
  "general-science": 1500,
  maths: 1300,
  reasoning: 900,
  hindi: 500,
  english: 400,
};

let total = 0;
let pyqTotal = 0;
const bySubject = {};
const byFile = {};

for (const dir of ["data/pyq", "data/subjects"]) {
  for (const f of fs.readdirSync(dir).filter((f) => f.endsWith(".json"))) {
    const file = path.join(dir, f);
    const arr = JSON.parse(fs.readFileSync(file, "utf8"));
    byFile[file] = arr.length;
    total += arr.length;
    if (dir === "data/pyq") pyqTotal += arr.length;
    for (const q of arr) bySubject[q.subject] = (bySubject[q.subject] || 0) + 1;
  }
}

console.log("=== File counts ===");
for (const [f, n] of Object.entries(byFile)) console.log(`${f}: ${n}`);

console.log("\n=== Subject counts ===");
for (const [s, n] of Object.entries(bySubject)) {
  console.log(`${s}: ${n}${TARGETS[s] ? ` / ${TARGETS[s]}` : ""}`);
}

console.log(`\nPYQ total: ${pyqTotal}`);
console.log(`TOTAL: ${total} / 10000 (${((total / 10000) * 100).toFixed(1)}%)`);
