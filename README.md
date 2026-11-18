# DeutschWeg 🇩🇪

Learn German from A1 to C2, with a focus on reaching B2.

```bash
npm install
npm run dev      # http://localhost:5173
npm test         # content + grammar-engine tests
npm run build    # static site in dist/ (host anywhere)
```

## What's inside
- **Path (Lernen)**: 37 units A1→C2, each with a grammar explanation, vocabulary with audio and 15+ exercises
  (multiple choice, gap fill, word order, translation, matching, dictation, speaking). Mistakes come back once
  for a second try. You earn stars and XP.
- **Placement test**: skips the levels you already know.
- **Üben**: spaced-repetition vocabulary review (SM-2) plus endless generated drills: der/die/das,
  verb conjugation (~90 verbs, 3 tenses), adjective endings, prepositions + case, numbers by ear, dictation.
- **Sprechen**: shadowing scored by speech recognition, timed Goethe-style speaking tasks, and an AI
  conversation partner.
- **Schreiben**: exam-format writing tasks with a timer, word count, live checks (connectors, register, length,
  noun capitals), a phrase bank, model answers and optional AI examiner correction.
- **Prüfung**: B2 reading, listening and Sprachbausteine modules, plus links to the writing and speaking parts.

## Notes
- Speech recognition works in Chrome or Edge. Text-to-speech uses the browser's German voice.
- AI features are optional. They use the learner's own Gemini API key, which is stored only in the browser.
- Progress is saved in localStorage. Use Profil → Export backup to move it to another device.
- Content lives in `src/data/*.ts`. To add a unit, add it to the right level array.

## Natural voices
All fixed sentences (dialogs, vocabulary, exercises, exam audio) are pre-recorded as MP3 files in
`public/audio/` using neural voices. Each character has their own voice (see `src/data/voices.ts`).
After you add or change content, run:

```bash
python3 -m venv .venv && .venv/bin/pip install edge-tts   # once
npm run audio                                             # renders only the missing clips
```
Generated text (drills, AI replies) still uses the browser voice.

## Accounts, admin & server
The app now needs a login. Progress and test results are stored on the server (SQLite, `server/data.db`).

```bash
npm run server                         # API on :8787 (keep running)
npm run dev                            # app on :5173, /api is proxied to :8787
npm run admin -- <user> <password>     # create or reset an admin account
npm start                              # production: build + serve app and API on :8787
```
- Students register themselves (or an admin creates their accounts).
- Admin (🛡️ in the menu): all students with XP, streak, units, words, tests and average/best score. Admins can open a
  student's test history with section scores, reset passwords, promote to admin, delete accounts and export CSV.
- **A1 Test-Center** (📝 Tests): 100 original questions (Hören, Lesen, Wortschatz, Grammatik, 25 each), as a full
  mock test, single sections or a 20-question quick test. Results are saved per account.
