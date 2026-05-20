```markdown
# 🎵 Forgotten Things

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![GitHub Pages](https://img.shields.io/badge/Deployed%20on-GitHub%20Pages-222222?logo=github)](https://pages.github.com/)

**Forgotten Things** is a single‑player 3D rhythm game where you explore a forgotten arcade archive and restore broken music machines through precisely timed keyboard inputs. The core verb—**synchronize**—captures the game’s theme of preservation as a physical, intentional act of reviving lost songs.

In a future where physical music is obsolete, you play as a freelance archivist who discovers The Curator’s hidden warehouse. By playing each arcade cabinet correctly, you restore the original recordings, uncover diary pages, and save the archive from demolition.

> 🔗 **[Play the live demo](https://yourusername.github.io/ForgottenThings/)** *(replace with your actual GitHub Pages URL)*

---

## ✨ Key Features

### 🎹 1. Seven‑Lane Rhythm Gameplay
- **Keyboard only** – no mouse needed for note input.
- Lanes mapped to `S`, `D`, `F`, `Space`, `J`, `K`, `L` for a two‑handed, typing‑like feel.
- Tap notes only – reduced cognitive load while preserving physical “repair” fantasy.

### 🔧 2. Restoration as Core Mechanic
- Each successful tap clears a layer of audio distortion.
- Maintain combos to fill the Resonance Meter and feel the cabinet “wake up.”
- Three outcomes: **Full Restoration** (unlocks special visual environment), **Partial Restoration** (lo‑fi playback), or **Distortion** (fail – try again).

### 🕹️ 3. Adjustable Note Speed
- Choose 1×, 2×, or 3× scroll speed to match your skill level.

### 📀 4. The Curator’s Archive Story
- Scattered diary pages (text in the right panel) reveal why The Curator built the archive.
- The warehouse environment evolves as you restore more songs (conceptual – currently represented through UI text).

### 💾 5. Data Persistence
- Game state (high scores, restoration status) saved to `localStorage`.
- Progress remains after page refresh.

### 🎧 6. Immersive Audio & Visuals
- Synthwave‑inspired neon highway with dynamic glow effects.
- Sound effects for notes, combo breaks, and restoration completion.
- Background music track (“Kataware Doki – Lost Recording”).

---

## 🎮 Gameplay Loop

The experience mirrors the act of repairing a broken machine:

1. **Start** → Click “INITIATE RESTORATION”.
2. **Play** → Tap keys as notes hit the judgment line. Time your hits to earn Perfect/Good/Bad/Miss.
3. **Restore** → High accuracy and combo grant “Full Restoration” (simulated in the current prototype).
4. **Explore** → Read the story panel to learn about The Curator.
5. **Repeat** → (Future versions will include multiple songs and an explorable 3D warehouse.)

This loop transforms passive listening into an active, rewarding repair process.

---

## 🛠️ Technology Stack

Forgotten Things is a client‑side web application with no backend dependencies.

- **Language**: JavaScript (ES6+)
- **Styling**: CSS3 (animations, Flexbox, custom properties)
- **Audio**: HTML5 Audio API
- **Data Persistence**: Web Storage API (`localStorage`)
- **Version Control**: Git & GitHub
- **Deployment**: GitHub Pages

### System Architecture

```
┌─────────────────────────────────────────────────────┐
│                    index.html                       │
├─────────────┬─────────────┬─────────────┬──────────┤
│   UI Layer  │  Game Loop  │  Judgement  │  Audio   │
│  (DOM/CSS)  │  (script.js)│   System    │  Module  │
└─────────────┴─────────────┴─────────────┴──────────┘
                     │              │
                     ▼              ▼
            ┌─────────────┐  ┌─────────────┐
            │  song.js    │  │ localStorage│
            │(note charts)│  │ (scores)    │
            └─────────────┘  └─────────────┘
```

---

## 📁 Project Structure

```
ForgottenThings/
├── index.html              # Main entry point
├── css/
│   └── style.css           # All styling, animations, neon effects
├── scripts/
│   ├── script.js           # Core game logic (timing, judgement, UI)
│   └── song.js             # Note chart for the demo track
├── media/
│   └── music.mp3           # Background music (Kataware Doki)
├── Draft.pdf               # Original design document
├── Playtest.pdf            # User testing report
├── Version #1.pdf          # Initial design (mouse + keyboard)
├── Version #2.pdf          # Revised design (keyboard only)
└── README.md               # This file
```

---

## 🧪 Testing & Quality Assurance

The project underwent iterative playtesting to refine the input scheme:

- **Playtest #1** (see `Playtest.pdf`): Original mouse+keyboard + laser traces caused cognitive overload.  
  → **Fix**: Removed mouse input entirely, reduced note types to Tap only.
- **Playtest #2**: Three lanes felt too simple for the “repair” fantasy.  
  → **Fix**: Expanded to seven lanes (SDF Space JKL) to increase physical engagement.
- **Final Validation**: Tester with rhythm‑game experience confirmed the current scheme is intuitive and satisfying.

Additional QA:
- Manual functional testing of timing windows (Perfect: <100ms, Good: 100‑200ms, etc.)
- Cross‑browser testing (Chrome, Firefox, Safari)
- `localStorage` persistence verified across refreshes

---

## 📅 Development Timeline

This prototype was built in an **iterative 6‑8 week cycle** by a team of three (conceptually). The current web version represents a playable vertical slice.

| Phase | Focus |
|-------|-------|
| **Week 1‑2** | Concept & vision (Draft.pdf) |
| **Week 3‑4** | Prototype Version #1 (mouse + keyboard, laser trails) |
| **Week 5** | Playtest analysis & redesign → Version #2 (keyboard only, 7 lanes) |
| **Week 6** | Web implementation (HTML/CSS/JS), note chart for demo song |
| **Week 7** | Polish animations, audio integration, localStorage |
| **Week 8** | Deployment, documentation, playtest video capture |

**Milestones:**
- ✅ Version #1 playable (failed test)
- ✅ Version #2 design approved
- ✅ Web prototype functional
- ✅ GitHub Pages deployment

---

## 👤 Author

**Changyu Wen**  
- Role: Solo Developer (for this web adaptation), Game Designer, UI/UX Designer  
- Responsibilities:
  - Rhythm game logic & timing system
  - HTML/CSS/JavaScript implementation
  - Note chart authoring (`song.js`)
  - Visual effects & animations
  - Playtesting & iterative redesign (based on `Playtest.pdf`)

*Original concept and design documents by Changyu Wen. The game is inspired by the desire to preserve physical media and the joy of arcade rhythm games.*

---

## 📜 License

This project is open source and available under the [MIT License](LICENSE).  
(Note: The background music `music.mp3` is a placeholder; replace it with royalty‑free or original music for redistribution.)

---

## 🙏 Acknowledgments

- Thank you to the playtester whose feedback transformed the game from unplayable to engaging.
- Inspired by rhythm games like *Rhythm Doctor*, *Arcaea*, and *Phigros*.
- Special thanks to The Curator (fictional) for leaving behind his archive.
```
