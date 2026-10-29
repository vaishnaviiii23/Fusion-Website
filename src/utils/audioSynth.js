/**
 * Procedural Ambient Audio Synthesizer (Web Audio API)
 * Provides a soothing, cinematic pentatonic ambient soundscape if no external
 * MP3 audio file is found or while loading, ensuring the audio experience is never broken.
 */

class AmbientSynth {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.timer = null;
    this.gainNode = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.gainNode = this.ctx.createGain();
        this.gainNode.gain.setValueAtTime(0.18, this.ctx.currentTime);
        this.gainNode.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  playChord() {
    if (!this.ctx || !this.isPlaying) return;

    // Cinematic pentatonic notes in D Minor / F Major (mystical, warm, festive)
    const frequencies = [
      [220.0, 261.63, 329.63, 392.0], // D3, F3, A3, C4
      [261.63, 329.63, 392.0, 523.25], // F3, A3, C4, E4
      [196.0, 246.94, 293.66, 392.0], // G3, B3, D4, G4
      [174.61, 220.0, 261.63, 349.23], // F3, A3, C4, F4
      [220.0, 293.66, 349.23, 440.0], // A3, D4, F4, A4
    ];

    const chord = frequencies[Math.floor(Math.random() * frequencies.length)];
    const now = this.ctx.currentTime;
    const duration = 4.2;

    chord.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();

      // Sine + Triangle warmth
      osc.type = idx % 2 === 0 ? "sine" : "triangle";
      osc.frequency.setValueAtTime(freq, now);

      // Subtle detune for shimmer
      osc.detune.setValueAtTime((Math.random() - 0.5) * 8, now);

      // Gentle envelope: fade in smoothly, sustain, fade out
      const stagger = idx * 0.12;
      noteGain.gain.setValueAtTime(0.0001, now + stagger);
      noteGain.gain.exponentialRampToValueAtTime(0.045, now + stagger + 0.8);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + stagger + duration);

      osc.connect(noteGain);
      noteGain.connect(this.gainNode);

      osc.start(now + stagger);
      osc.stop(now + stagger + duration + 0.1);
    });
  }

  start() {
    this.init();
    if (!this.ctx) return;
    this.isPlaying = true;
    this.playChord();

    this.timer = setInterval(() => {
      if (this.isPlaying) {
        this.playChord();
      }
    }, 3800);
  }

  stop() {
    this.isPlaying = false;
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  setVolume(volume) {
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setValueAtTime(Math.max(0, Math.min(1, volume * 0.2)), this.ctx.currentTime);
    }
  }
}

export const ambientSynth = new AmbientSynth();
