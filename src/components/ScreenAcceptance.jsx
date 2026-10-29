import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, CheckCircle2, Ticket, Music, Flame } from "lucide-react";
import confetti from "canvas-confetti";
import { EVENT_DETAILS } from "../config/eventData";

export default function ScreenAcceptance({ onScrollToDetails }) {
  // Fire celebratory gold & violet confetti burst on mount
  useEffect(() => {
    try {
      // Golden & violet particles burst
      const count = 70;
      const defaults = {
        origin: { y: 0.65 },
        colors: ["#F5BE47", "#D97706", "#A855F7", "#EC4899", "#38BDF8", "#FFFFFF"],
        disableForReducedMotion: true,
      };

      confetti({
        ...defaults,
        particleCount: Math.floor(count * 0.6),
        spread: 60,
        startVelocity: 45,
      });

      confetti({
        ...defaults,
        particleCount: Math.floor(count * 0.4),
        spread: 100,
        startVelocity: 35,
        decay: 0.92,
        scalar: 1.1,
      });
    } catch {
      // Canvas confetti fallback
    }
  }, []);

  return (
    <section aria-label="Invitation Acceptance" className="relative z-10 w-full max-w-2xl text-center mx-auto mb-16 pt-8">
      {/* Small Confirmation-Style Status Label */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-xs font-bold tracking-widest text-emerald-300 uppercase shadow-lg shadow-emerald-950/30 mb-6"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
        <span>{EVENT_DETAILS.acceptance.badge}</span>
      </motion.div>

      {/* Prominent Headline: IT'S A YES! YOU'RE ON THE LIST. */}
      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="font-serif text-3xl sm:text-5xl md:text-6xl font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-purple-200 uppercase mb-4 drop-shadow-[0_4px_25px_rgba(245,190,71,0.25)]"
      >
        {EVENT_DETAILS.acceptance.headline}
      </motion.h1>

      {/* Subhead: Your place at FUSION 2026 awaits. */}
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35 }}
        className="font-serif text-xl sm:text-2xl text-amber-300 font-semibold mb-6 tracking-wide"
      >
        {EVENT_DETAILS.acceptance.subhead}
      </motion.h2>

      {/* Warm Supporting Message */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed mb-10 px-4"
      >
        {EVENT_DETAILS.acceptance.message}
      </motion.p>

      {/* Keepsake Pass Card */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.65 }}
        className="relative mx-4 sm:mx-auto max-w-lg p-6 sm:p-7 rounded-3xl bg-gradient-to-b from-purple-950/40 via-slate-900/60 to-slate-950/80 border border-amber-400/30 backdrop-blur-2xl shadow-2xl shadow-purple-950/50 overflow-hidden text-left"
      >
        {/* Holographic light sheen shimmer */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent pointer-events-none" />

        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
          <div className="flex items-center gap-2">
            <Ticket className="w-5 h-5 text-amber-400" />
            <span className="text-xs font-semibold tracking-widest uppercase text-amber-300">
              COMMEMORATIVE INVITATION PASS
            </span>
          </div>
          <span className="text-[11px] font-mono text-purple-300 bg-purple-950/80 px-2.5 py-0.5 rounded-full border border-purple-500/30">
            #FUS-2026-GLA
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-5">
          <div>
            <p className="text-[11px] uppercase tracking-wider text-slate-400">Guest Status</p>
            <p className="text-sm font-semibold text-white mt-0.5">Honored Attendee</p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-wider text-slate-400">Hosted By</p>
            <p className="text-sm font-semibold text-amber-300 mt-0.5 flex items-center gap-1">
              <span>Ninad</span> <span className="text-purple-400 font-light">×</span> <span>Natraj</span>
            </p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-wider text-slate-400">Date & Time</p>
            <p className="text-sm font-semibold text-white mt-0.5">{EVENT_DETAILS.dateFormatted} • {EVENT_DETAILS.timeFormatted}</p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-wider text-slate-400">Location</p>
            <p className="text-sm font-semibold text-white mt-0.5">{EVENT_DETAILS.venue}</p>
          </div>
        </div>

        {/* Club Dual Emblem Ribbons inside card */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1 text-amber-300/80">
            <Music className="w-3.5 h-3.5" /> Ninad Music Society
          </span>
          <span className="flex items-center gap-1 text-purple-300/80">
            <Flame className="w-3.5 h-3.5" /> Natraj Dance Society
          </span>
        </div>
      </motion.div>

      {/* Gentle Scroll Prompt to Details */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="mt-10"
      >
        <button
          onClick={onScrollToDetails}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs font-medium text-slate-200 hover:text-white transition-all transform hover:scale-105"
        >
          <span>Explore Event Details & Calendar</span>
          <span className="text-amber-400 animate-bounce">↓</span>
        </button>
      </motion.div>
    </section>
  );
}
