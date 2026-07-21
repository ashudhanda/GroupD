// Usage: node scripts/validate.js
// Checks every data file against the question format rules.
const fs = require("fs");
const path = require("path");

const DATA_DIRS = ["data/pyq", "data/subjects"];
const LETTERS = { A: 0, B: 1, C: 2, D: 3 };
const SUBJECTS = ["haryana-gk", "general-awareness", "general-science", "maths", "reasoning", "hindi", "english"];

let errors = 0;
function err(file, i, msg) {
  errors++;
  console.error(`ERROR ${file} [#${i}]: ${msg}`);
}

for (const dir of DATA_DIRS) {
  for (const f of fs.readdirSync(dir).filter((f) => f.endsWith(".json"))) {
    const file = path.join(dir, f);
    let arr;
    try {
      arr = JSON.parse(fs.readFileSync(file, "utf8"));
    } catch (e) {
      err(file, "-", "Invalid JSON: " + e.message);
      continue;
    }
    if (!Array.isArray(arr)) {
      err(file, "-", "Root must be a JSON array");
      continue;
    }
    arr.forEach((q, i) => {
      for (const k of ["question_en", "question_hi", "answer_letter", "subject", "type", "source", "fingerprint", "explanation"]) {
        if (!q[k]) err(file, i, `missing field: ${k}`);
      }
      if (!Array.isArray(q.options_en) || q.options_en.length !== 4) err(file, i, "options_en must have exactly 4 options");
      if (!Array.isArray(q.options_hi) || q.options_hi.length !== 4) err(file, i, "options_hi must have exactly 4 options");
      if (Array.isArray(q.options_en) && new Set(q.options_en).size !== q.options_en.length) err(file, i, "duplicate options in options_en");
      if (LETTERS[q.answer_letter] === undefined) err(file, i, "answer_letter must be A/B/C/D");
      else if (q.answer_index !== LETTERS[q.answer_letter]) err(file, i, `answer_index (${q.answer_index}) does not match answer_letter (${q.answer_letter})`);
      if (!SUBJECTS.includes(q.subject)) err(file, i, `invalid subject: ${q.subject}`);
      if (!["pyq", "practice"].includes(q.type)) err(file, i, 'type must be "pyq" or "practice"');
      if (dir === "data/pyq" && q.type !== "pyq") err(file, i, "non-pyq question inside data/pyq folder");
      if (dir === "data/subjects" && q.type !== "practice") err(file, i, "pyq question inside data/subjects folder");
      if (q.id != null && !/^[A-Z0-9]+(-[A-Z0-9]+)*-[0-9]{5}$/.test(q.id)) err(file, i, `bad id format: ${q.id}`);
    });
  }
}

if (errors === 0) console.log("OK: all files valid");
else console.error(`FAILED: ${errors} error(s) found`);
process.exit(errors === 0 ? 0 : 1);
