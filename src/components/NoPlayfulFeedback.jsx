import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, HeartHandshake } from "lucide-react";

export default function NoPlayfulFeedback({ message, clickCount }) {
  if (!message) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={message}
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -8, scale: 0.96 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md mx-auto mt-4 px-4 py-3 rounded-2xl bg-gradient-to-r from-purple-950/60 via-slate-900/80 to-indigo-950/60 border border-purple-500/30 backdrop-blur-xl shadow-xl shadow-purple-950/30 text-center relative"
        role="status"
        aria-live="polite"
      >
        {/* Top subtle pointer */}
        <div
          className="w-3 h-3 bg-purple-900/80 border-t border-l border-purple-500/30 transform rotate-45 absolute -top-1.5 left-1/2 -translate-x-1/2"
          aria-hidden="true"
        />

        <div className="flex items-center justify-center gap-1.5 mb-1 text-[11px] font-semibold tracking-wider uppercase text-amber-300/90">
          <Sparkles className="w-3 h-3" />
          <span>Thought for thought • Reconsideration #{clickCount}</span>
          <HeartHandshake className="w-3 h-3" />
        </div>

        <p className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed">
          "{message}"
        </p>

        <p className="text-[11px] text-purple-300/80 mt-1.5 italic">
          (The stage is calling your name... take your time!)
        </p>
      </motion.div>
    </AnimatePresence>
  );
}
