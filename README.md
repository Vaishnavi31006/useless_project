<img width="1280" height="640" alt="Brainrot Meter Header" src="https://github.com/user-attachments/assets/8920b256-2ba8-4988-b824-5351134eb4bd" />

# Brainrot Meter 🧠⚡

> An internet-native diagnostic experience measuring your online exposure, feed colonization, and culture recognition across memes, cinema lore, viral audio, and AI generations.

---

## Basic Details
### Team Name: The Terminally Online Duo

### Team Members
- Team Lead: Vaishnavi - TinkerHub Useless Projects
- Member 2: Antigravity AI - Pair Programmer

### Project Description
Brainrot Meter is an interactive, highly responsive web application that measures your level of internet immersion through dynamic questions. It features two specialized question formats: **Feed Exposure Questions** (which diagnose what content your algorithm has served you) and **Recognition Questions** (which test rapid cultural recall). Evaluates both your claimed exposure and response reflex speed to calculate your overall **Brainrot Percentage** and deliver an unhinged, personalized verdict.

### The Problem (that doesn't exist)
Modern medicine has no diagnostic criteria to assess whether your feed has permanently altered your attention span and humor. Millions scroll through niche subreddits and TikTok audio edits without any clinical documentation of their digital exposure.

### The Solution (that nobody asked for)
An unhinged, precision-calibrated browser diagnostic test with a strict 10-second recognition timer, reactive dry commentary after every stage, synchronized audio/video playback, dynamic question scaling, support for 2, 3, or 4 options, and a celebratory results reveal with shareable verdicts ranging from *“Freshly Grass-Touched”* to *“Beyond Saving”*.

---

## Technical Details

### Technologies Used
- **Frontend Framework:** React 18 (with TypeScript)
- **Build Tool:** Vite 6
- **Styling:** Tailwind CSS (custom dark obsidian theme, ambient mesh gradients, custom noise grain)
- **Icons:** Lucide React
- **Celebration Effects:** Canvas Confetti
- **Architecture:** Local-first, zero-backend, 100% dynamic state machine with `performance.now()` precision timing

---

## Implementation & Quick Start

### Installation
```bash
npm install
```

### Run Locally
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### Build for Production
```bash
npm run build
npm run preview
```

---

# HOW TO ADD YOUR OWN QUESTIONS AND MEDIA

> **IMPORTANT:** You do **NOT** need to write or edit React/TypeScript code! The entire app dynamically adapts to whatever is configured in:
> ```
> src/data/questions.json
> ```

---

## The Two Question Modes

Every question in `questions.json` must specify a `"mode"`:
1. `"mode": "feed"`
2. `"mode": "recognition"`

---

### 1. Feed / Exposure Questions (`"mode": "feed"`)

**When to use:** Use this when you want to measure whether someone has encountered a meme, soundbite, or trend on their feed.

**Key rules:**
- There is **NO correct or incorrect answer**.
- The `"answer"` field is **NOT required**.
- You can use **2, 3, or 4 options**.
- Each option has a `"text"` and an `"exposureScore"` (0 to 70 base points).

#### Default Exposure Points:
- Strongest recognition (e.g. *"THIS HAS BEEN EVERYWHERE"*): `70`
- Moderate recognition (e.g. *"I'VE SEEN IT A FEW TIMES"*): `50`
- Slight recognition (e.g. *"VAGUELY FAMILIAR"*): `30`
- Never seen (e.g. *"NEVER SEEN THIS"*): `0`

#### Speed Bonus for Feed Questions:
- Fast answers earn up to **30 bonus points**: `30 * Math.max(0, 1 - timeTaken / 10)`.
- If the user selects an option with `exposureScore: 0` (*"Never Seen"*), **0 points are awarded regardless of speed**.

#### Example Feed Question (4 Options):
```json
{
  "id": 1,
  "category": "memes",
  "mode": "feed",
  "type": "image",
  "media": "/media/memes/q1_distracted_bf.jpg",
  "question": "BE HONEST. HAVE YOU SEEN THIS ON YOUR FEED?",
  "options": [
    { "text": "THIS HAS BEEN EVERYWHERE", "exposureScore": 70 },
    { "text": "I'VE SEEN IT A FEW TIMES", "exposureScore": 50 },
    { "text": "VAGUELY FAMILIAR", "exposureScore": 30 },
    { "text": "NEVER SEEN THIS", "exposureScore": 0 }
  ]
}
```

#### Example Feed Question (2 Options):
```json
{
  "id": 3,
  "category": "memes",
  "mode": "feed",
  "type": "none",
  "media": null,
  "question": "Did you live through the 2016 Harambe gorilla lore timeline?",
  "options": [
    { "text": "I WAS THERE. UNFORGETTABLE.", "exposureScore": 70 },
    { "text": "NEVER HEARD OF THIS", "exposureScore": 0 }
  ]
}
```

---

### 2. Normal Recognition Questions (`"mode": "recognition"`)

**When to use:** Use this when you want to test whether someone can actually answer or complete a cultural reference correctly.

**Key rules:**
- There is **one objectively correct answer**.
- Must include the `"answer"` field.
- The `"answer"` field is zero-based:
  - `0` = 1st option
  - `1` = 2nd option
  - `2` = 3rd option
  - `3` = 4th option
- Correct answer earns **70 base points + up to 30 speed bonus points** (Max 100).
- Wrong answer or timeout earns **0 points**.
- You can use **2, 3, or 4 options**.

#### Example Recognition Question (3 Options):
```json
{
  "id": 6,
  "category": "movies",
  "mode": "recognition",
  "type": "audio",
  "media": "/media/movies/q6_inception_horn.wav",
  "question": "Listen to this brass drone. Which movie popularized the 'BRAAM' trailer sound?",
  "options": [
    "Inception",
    "Dunkirk",
    "Tenet"
  ],
  "answer": 0
}
```

---

## Supported Media & Timing Rules

The app supports 4 media types (`"type"`):
- `"image"` (`.jpg`, `.webp`, `.png`)
- `"audio"` (`.mp3`, `.wav`)
- `"video"` (`.mp4`, `.webm`)
- `"none"` (`media: null`)

### ⏱️ How Media Playback Affects the Timer:
- **Images & Text:** The 10-second recognition countdown starts **immediately**.
- **Audio & Video:** The media plays first while the recognition timer stays **paused**. The 10-second countdown triggers **only after the audio/video finishes**! (Users can also click *"Skip Audio/Video"* to jump straight to answering).

---

## How to Add Media Files

1. Open the project in VS Code.
2. Drag your media file into the corresponding subfolder:
   - `public/media/memes/`
   - `public/media/movies/`
   - `public/media/music/`
   - `public/media/ai/`
   - `public/media/slang/`
3. Reference it in `src/data/questions.json` starting with `/media/...` (e.g. `"/media/memes/my_meme.jpg"`).

---

## How to Add Question 16, 20, 25, etc.

1. Open `src/data/questions.json`.
2. Scroll to the last question. Add a comma `,` after the closing `}`.
3. Paste your new question:
```json
  {
    "id": 16,
    "category": "ai",
    "mode": "feed",
    "type": "image",
    "media": "/media/ai/q11_pope_puffer.jpg",
    "question": "Have you seen this synthetic generation before?",
    "options": [
      { "text": "YES, ALL OVER MY FEED", "exposureScore": 70 },
      { "text": "NO, NEVER", "exposureScore": 0 }
    ]
  }
```
4. Save the file.
5. The application will automatically recalculate:
   - Dynamic stage count (`01 / 16`)
   - Maximum score (`16 * 100 = 1600`)
   - Landing page subtitle (*"16 stages. Zero context..."*)
   - Overall percentage and verdicts

---

## The 5 Internal Categories
Categories are used **internally only** by the commentary engine to select fitting roasts. They are **never shown to the user**:
- `"memes"`
- `"movies"`
- `"music"`
- `"ai"`
- `"slang"`

---

## Common Mistakes to Avoid
1. **Trailing Comma:** Do not put a comma after the final question object in `questions.json`.
2. **Missing Answer on Recognition Question:** If `"mode": "recognition"`, you must provide `"answer": 0` (or `1`, `2`, `3`).
3. **Out-of-Bounds Answer Index:** If a question has 3 options, `"answer"` must be `0`, `1`, or `2` (never `3`).
4. **Option Count:** Every question must have **2, 3, or 4 options**.
5. **Missing Media File:** If `"type": "image"`, the path in `"media"` must exist in `public/`.

*(If any error occurs, an interactive developer validation banner will appear on your screen explaining exactly what to fix!)*

---

## Team Contributions
- **Vaishnavi**: Concept ideation, feed vs recognition framework, UI/UX direction, media curation.
- **Antigravity AI**: Dual-mode quiz engine, dynamic options grid, exposure scoring algorithms, and reactive commentary system.

---
Made with ❤️ at TinkerHub Useless Projects 

![Static Badge](https://img.shields.io/badge/TinkerHub-24?color=%23000000&link=https%3A%2F%2Fwww.tinkerhub.org%2F)
![Static Badge](https://img.shields.io/badge/UselessProjects--26-26?link=https%3A%2F%2Ftinkerhub.org%2Fevents%2F1M8ORET9A1%2Fuseless-projects-3.0)
