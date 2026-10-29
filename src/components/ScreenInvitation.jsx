import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Music, Flame, CheckCircle2, XCircle } from "lucide-react";
import { EVENT_DETAILS } from "../config/eventData";
import NoPlayfulFeedback from "./NoPlayfulFeedback";

export default function ScreenInvitation({ onAccept }) {
  const [noIndex, setNoIndex] = useState(-1);
  const [noCount, setNoCount] = useState(0);
  const [wiggle, setWiggle] = useState(false);

  const handleNoClick = () => {
    // Increment count & cycle through messages
    setNoCount((prev) => prev + 1);
    setNoIndex((prev) => (prev + 1) % EVENT_DETAILS.noMessages.length);
    
    // Trigger subtle playful wiggle
    setWiggle(true);
    setTimeout(() => setWiggle(false), 450);
  };

  // Yes button scale & glow boosts slightly with each 'No' click (up to a tasteful cap)
  const yesButtonGlowLevel = Math.min(noCount, 5);
  const glowShadows = [
    "shadow-lg shadow-amber-500/20",
    "shadow-xl shadow-amber-500/35 ring-1 ring-amber-400/50",
    "shadow-2xl shadow-amber-500/45 ring-2 ring-amber-400/70",
    "shadow-2xl shadow-amber-500/60 ring-2 ring-amber-400/90 scale-[1.02]",
    "shadow-[0_0_35px_rgba(245,190,71,0.7)] ring-2 ring-amber-300 scale-[1.04]",
    "shadow-[0_0_45px_rgba(245,190,71,0.85)] ring-2 ring-amber-300 scale-[1.05]",
  ];

  return (
    <main className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 25, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.96 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-2xl text-center"
      >
        {/* Eyebrow Label */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-amber-400/20 text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-amber-300 uppercase backdrop-blur-md mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>GLA UNIVERSITY PRESENTS</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
        </motion.div>

        {/* Striking FUSION 2026 Wordmark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-3"
        >
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl font-black tracking-wider uppercase text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400 drop-shadow-[0_4px_30px_rgba(168,85,247,0.35)] select-none">
            FUSION <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-purple-300 to-cyan-300">2026</span>
          </h1>
          <p className="sr-only">FUSION 2026</p>
        </motion.div>

        {/* Club Collaborators Tag: NINAD x NATRAJ */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase mb-8"
        >
          <span className="flex items-center gap-1.5 text-amber-300/90 hover:text-amber-300 transition-colors">
            <Music className="w-3.5 h-3.5 text-amber-400" />
            NINAD
          </span>
          <span className="text-purple-400 font-light select-none">×</span>
          <span className="flex items-center gap-1.5 text-purple-300/90 hover:text-purple-300 transition-colors">
            <Flame className="w-3.5 h-3.5 text-purple-400" />
            NATRAJ
          </span>
        </motion.div>

        {/* Central Invitation Parchment / Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.7 }}
          className="relative p-6 sm:p-10 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-2xl shadow-2xl shadow-purple-950/40"
        >
          {/* Subtle decorative corner marks */}
          <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-amber-400/40 rounded-tl-sm pointer-events-none" />
          <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-amber-400/40 rounded-tr-sm pointer-events-none" />
          <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-purple-400/40 rounded-bl-sm pointer-events-none" />
          <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-purple-400/40 rounded-br-sm pointer-events-none" />

          {/* Central Invitation Question */}
          <h2 className="font-serif text-lg sm:text-2xl md:text-2xl text-slate-100 font-medium leading-relaxed mb-8 max-w-xl mx-auto">
            {EVENT_DETAILS.invitationQuestion}
          </h2>

          {/* Two Interactive Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            {/* Yes Button */}
            <motion.button
              onClick={onAccept}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className={`w-full sm:w-auto flex-1 flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl font-semibold text-sm sm:text-base text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 focus:ring-offset-slate-950 cursor-pointer ${
                glowShadows[yesButtonGlowLevel]
              }`}
              aria-label="Accept invitation: Yes, I'll be there"
            >
              <CheckCircle2 className="w-5 h-5 text-slate-950" />
              <span>{EVENT_DETAILS.yesButtonLabel}</span>
              {noCount > 0 && (
                <span className="text-[10px] bg-slate-950/20 text-slate-950 px-1.5 py-0.5 rounded-full font-bold ml-1 animate-pulse">
                  ✨
                </span>
              )}
            </motion.button>

            {/* No Button */}
            <motion.button
              onClick={handleNoClick}
              animate={
                wiggle
                  ? {
                      x: [0, -8, 8, -6, 6, -3, 3, 0],
                      rotate: [0, -2, 2, -1, 1, 0],
                    }
                  : { x: 0, rotate: 0 }
              }
              transition={{ duration: 0.4 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-semibold text-sm sm:text-base text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 hover:border-purple-400/40 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-slate-950 cursor-pointer"
              aria-label="Decline invitation: No, I can't make it"
            >
              <XCircle className="w-4 h-4 text-slate-400" />
              <span>{EVENT_DETAILS.noButtonLabel}</span>
            </motion.button>
          </div>

          {/* Interactive Witty Reconsideration Bubble */}
          {noIndex >= 0 && (
            <NoPlayfulFeedback
              message={EVENT_DETAILS.noMessages[noIndex]}
              clickCount={noCount}
            />
          )}
        </motion.div>

        {/* Tasteful Footer Hint */}
        <p className="mt-8 text-xs text-slate-400 font-light tracking-wide">
          An evening of acoustic cadence & choreographic spirit • GLA University
        </p>
      </motion.div>
    </main>
  );
}
