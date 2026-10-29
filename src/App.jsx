import React, { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Music, Mail } from "lucide-react";
import BackgroundCanvas from "./components/BackgroundCanvas";
import ScreenInvitation from "./components/ScreenInvitation";
import ScreenAcceptance from "./components/ScreenAcceptance";
import ScreenEventDetails from "./components/ScreenEventDetails";
import AmbientAudioPlayer from "./components/AmbientAudioPlayer";
import { EVENT_DETAILS } from "./config/eventData";

export default function App() {
  const [accepted, setAccepted] = useState(false);
  const [autoPlayTrigger, setAutoPlayTrigger] = useState(false);

  const detailsRef = useRef(null);

  const handleAccept = () => {
    setAccepted(true);
    setAutoPlayTrigger(true);
    // Smooth scroll to top on transition
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToInvitation = () => {
    setAccepted(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleScrollToDetails = () => {
    if (detailsRef.current) {
      detailsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#060713] text-slate-100 flex flex-col justify-between overflow-x-hidden selection:bg-purple-600 selection:text-white">
      {/* Dynamic Animated Canvas Background */}
      <BackgroundCanvas />

      {/* Floating Ambient Music Player */}
      <AmbientAudioPlayer autoPlayTrigger={autoPlayTrigger} />

      {/* Main Interactive Screen Content */}
      <AnimatePresence mode="wait">
        {!accepted ? (
          <motion.div
            key="invitation-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20, filter: "blur(6px)" }}
            transition={{ duration: 0.5 }}
            className="flex-1 flex flex-col justify-center"
          >
            <ScreenInvitation onAccept={handleAccept} />
          </motion.div>
        ) : (
          <motion.div
            key="acceptance-screen"
            initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 flex flex-col items-center justify-start min-h-screen px-4 pt-10"
          >
            {/* Screen 2: Acceptance & RSVP Confirmation */}
            <ScreenAcceptance onScrollToDetails={handleScrollToDetails} />

            {/* Screen 3: Official Event Details */}
            <ScreenEventDetails
              onBackToInvitation={handleBackToInvitation}
              detailsRef={detailsRef}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Refined University & Credits Footer */}
      <footer className="relative z-10 py-8 text-center text-xs text-slate-400 border-t border-white/5 backdrop-blur-md px-4">
        <div className="max-w-2xl mx-auto flex flex-col items-center gap-2.5">
          <p className="flex flex-wrap items-center justify-center gap-2 font-medium text-slate-300">
            <span>GLA University</span>
            <span>•</span>
            <span className="text-amber-300">Ninad Music Society</span>
            <span>×</span>
            <span className="text-purple-300">Natraj Dance Society</span>
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] sm:text-xs text-slate-400">
            <span className="inline-flex items-center gap-1.5 text-slate-300">
              <Music className="w-3.5 h-3.5 text-amber-400" />
              Song Credit: <strong className="text-amber-200 font-semibold">{EVENT_DETAILS.audioArtist}</strong>
            </span>
            <span className="hidden sm:inline text-slate-600">•</span>
            <a
              href={`mailto:${EVENT_DETAILS.contactEmail}`}
              className="inline-flex items-center gap-1.5 text-purple-300 hover:text-purple-200 underline decoration-purple-400/40 hover:decoration-purple-300 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-purple-400" />
              <span>Contact: {EVENT_DETAILS.contactEmail}</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
