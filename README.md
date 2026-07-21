# GroupD — HSSC Group D 10K Question Bank 🏭

Bilingual (English + Hindi) MCQ question bank for **HSSC Group D / Haryana CET** exam prep.
Questions are stored as JSON — ready for direct database import and website mock tests.

**Target: 10,000+ questions**

## 📁 Structure

```
data/
├── pyq/          ← Previous Year Questions (exam-wise files)
│   ├── group-d-2018.json
│   ├── cet-group-d-2023.json
│   ├── cet-group-c-2022.json
│   ├── cet-group-c-2023.json
│   └── haryana-police-2015-2021.json
└── subjects/     ← Practice questions (subject-wise files)
    ├── haryana-gk.json
    ├── general-awareness.json
    ├── general-science.json
    ├── maths.json
    ├── reasoning.json
    ├── hindi.json
    └── english.json
schema/
└── question.schema.json   ← JSON Schema for every question
scripts/
├── validate.js   ← schema + answer-index checks
├── dedupe.js     ← fingerprint duplicate detection
└── stats.js      ← progress counts
```

## 🧾 Question format

```json
{
  "id": "HGK-00001",
  "question_en": "Which river is known as the lifeline of Haryana?",
  "question_hi": "कौन सी नदी हरियाणा की जीवन रेखा कहलाती है?",
  "options_en": ["Yamuna", "Ghaggar", "Saraswati", "Markanda"],
  "options_hi": ["यमुना", "घग्गर", "सरस्वती", "मारकंडा"],
  "answer_letter": "A",
  "answer_index": 0,
  "subject": "haryana-gk",
  "topic": "Rivers of Haryana",
  "difficulty": "easy",
  "type": "pyq",
  "source": "CET Group D 2023 — 21 Oct Shift 1",
  "exam": "CET Group D 2023",
  "date_shift": "21 Oct 2023 Shift 1",
  "explanation": "Yamuna flows along Haryana's eastern border and is its main irrigation source.",
  "fingerprint": "which river is known as the lifeline of haryana",
  "source_model": "Notion AI"
}
```

**Rules:**
- `answer_index` is 0-based (A=0, B=1, C=2, D=3) — use directly in mock tests
- `fingerprint` = English question lowercased, punctuation removed, single spaces — used for duplicate detection
- PYQ questions live **only** in `data/pyq/`, practice questions **only** in `data/subjects/`
- IDs are assigned centrally at merge time (never by extraction chats)

## 🆔 ID prefixes

| File | Prefix |
|---|---|
| group-d-2018.json | `PYQ-GD18-` |
| cet-group-d-2023.json | `PYQ-CD23-` |
| cet-group-c-2022.json | `PYQ-CC22-` |
| cet-group-c-2023.json | `PYQ-CC23-` |
| haryana-police-2015-2021.json | `PYQ-HP-` |
| haryana-gk.json | `HGK-` |
| general-awareness.json | `GA-` |
| general-science.json | `GS-` |
| maths.json | `MTH-` |
| reasoning.json | `RSN-` |
| hindi.json | `HIN-` |
| english.json | `ENG-` |

## 🔧 Scripts

```bash
node scripts/validate.js   # schema + answer checks
node scripts/dedupe.js     # duplicate fingerprint check
node scripts/stats.js      # progress counts
```

## 📊 Progress

| Phase | Content | Target | Done |
|---|---|---|---|
| 1 | PYQ — Group D 2018 | ~800 | 0 |
| 2 | PYQ — CET Group D 2023 | ~400 | 0 |
| 3 | PYQ — CET Group C + Haryana Police | ~1,800 | 0 |
| 4 | Haryana GK | 2,800 | 0 |
| 5 | General Science + GA | 3,000 | 0 |
| 6 | Maths + Reasoning | 2,200 | 0 |
| 7 | Hindi + English | 900 | 0 |
| 🎯 | **Total** | **10,000+** | **0** |
