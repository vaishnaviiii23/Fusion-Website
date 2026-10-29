# FUSION 2026 — Interactive Event Invitation Website
*Ninad (Music) × Natraj (Dance) • GLA University*

A production-quality interactive event invitation website celebrating the collaborative cultural fusion of two clubs at GLA University.

---

## 🚀 Quick Start

The development server is running locally at:
👉 **[http://localhost:3000](http://localhost:3000)**

To run commands manually from the terminal:
```bash
# Start development server
npm run dev

# Create a production build
npm run build

# Preview production build
npm run preview
```

---

## 🎵 How to Add or Replace Your Audio Track

A placeholder file and fallback ambient synthesizer are pre-configured so the website works immediately. To replace it with your official audio song:

1. Copy your audio file into:
   ```
   public/audio/fusion-song.mp3
   ```
2. If your file has a different name or extension (e.g., `theme-song.wav`, `fusion.m4a`), update the path in:
   ```javascript
   // src/config/eventData.js
   export const EVENT_DETAILS = {
     // ...
     audioPath: "/audio/your-filename.mp3",
   };
   ```

---

## 🎨 How to Customize Content & Design

All event data, wording, and options are centralized in `src/config/eventData.js`:

| Customization | Location | Description |
|---|---|---|
| **Event Details** | `src/config/eventData.js` | Date, time, venue, institution, club names |
| **Invitation Copy** | `src/config/eventData.js` | Eyebrow, headline, central invitation question |
| **No-Button Responses** | `src/config/eventData.js` | Cycle of playful, witty reconsideration messages |
| **Color Theme & Gradients** | `tailwind.config.js` | Palette for Ninad (Gold), Natraj (Purple), and Fusion (Cyan) |
| **Intersecting Ribbons** | `src/components/BackgroundCanvas.jsx` | Wave frequencies, speeds, colors, and particle counts |
