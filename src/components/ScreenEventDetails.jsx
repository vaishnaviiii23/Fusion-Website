import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  Building2,
  Users,
  Download,
  ExternalLink,
  ArrowLeft,
  Share2,
  Check,
  Sparkles,
} from "lucide-react";
import { EVENT_DETAILS } from "../config/eventData";
import { generateICSFile, getGoogleCalendarUrl } from "../utils/calendar";

export default function ScreenEventDetails({ onBackToInvitation, detailsRef }) {
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Countdown timer to 3 November 2026, 4:00 PM IST
  useEffect(() => {
    const target = new Date("2026-11-03T16:00:00+05:30").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "FUSION 2026 Invitation — Ninad × Natraj",
          text: "Join us for FUSION 2026 at GLA University! An evening where rhythm meets artistry.",
          url: window.location.href,
        });
      } catch {
        // User cancelled share
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section
      ref={detailsRef}
      aria-label="Event Details"
      className="relative z-10 w-full max-w-4xl mx-auto px-4 pb-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="rounded-3xl bg-slate-900/60 border border-purple-500/20 backdrop-blur-2xl shadow-2xl shadow-purple-950/40 p-6 sm:p-10"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-amber-300 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Official Event Information</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white tracking-wide">
              {EVENT_DETAILS.name}
            </h2>
            <p className="text-sm text-purple-300/90 mt-1">
              Presented by {EVENT_DETAILS.presentedBy} • {EVENT_DETAILS.institution}
            </p>
          </div>

          {/* Back to Invitation Button */}
          <button
            onClick={onBackToInvitation}
            className="self-start sm:self-center inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs font-medium text-slate-300 hover:text-white transition-all transform hover:-translate-x-0.5 focus:outline-none focus:ring-2 focus:ring-purple-400"
            aria-label="Back to invitation screen"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to invitation</span>
          </button>
        </div>

        {/* Live Countdown Grid */}
        <div className="mb-10 p-5 rounded-2xl bg-slate-950/50 border border-white/5">
          <p className="text-xs font-medium uppercase tracking-widest text-slate-400 text-center mb-4">
            Countdown to FUSION 2026
          </p>
          <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md mx-auto text-center">
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-amber-300 block">
                {String(timeLeft.days).padStart(2, "0")}
              </span>
              <span className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider">Days</span>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-white block">
                {String(timeLeft.hours).padStart(2, "0")}
              </span>
              <span className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider">Hours</span>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-purple-300 block">
                {String(timeLeft.minutes).padStart(2, "0")}
              </span>
              <span className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider">Mins</span>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-cyan-300 block">
                {String(timeLeft.seconds).padStart(2, "0")}
              </span>
              <span className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider">Secs</span>
            </div>
          </div>
        </div>

        {/* Exact Event Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-10">
          {/* Card: Date */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-950/20 to-slate-900/60 border border-amber-400/20 flex items-start gap-4 hover:border-amber-400/40 transition-colors">
            <div className="p-3 rounded-xl bg-amber-400/10 text-amber-300 shrink-0">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-400 font-medium">Event Date</p>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-amber-200 mt-0.5">
                {EVENT_DETAILS.dateFormatted}
              </h3>
              <p className="text-xs text-slate-300 mt-1 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                {EVENT_DETAILS.timeFormatted}
              </p>
            </div>
          </div>

          {/* Card: Venue */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-950/20 to-slate-900/60 border border-purple-500/20 flex items-start gap-4 hover:border-purple-400/40 transition-colors">
            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-300 shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-400 font-medium">Venue Location</p>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-purple-200 mt-0.5">
                {EVENT_DETAILS.venue}
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                {EVENT_DETAILS.venueSubtext}
              </p>
            </div>
          </div>

          {/* Card: Presented By */}
          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-white/[0.05] text-slate-300 shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-400 font-medium">Presented By</p>
              <h3 className="text-base sm:text-lg font-semibold text-white mt-0.5">
                {EVENT_DETAILS.presentedBy}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                The Music & Dance Clubs Collaboration
              </p>
            </div>
          </div>

          {/* Card: Institution */}
          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-white/[0.05] text-slate-300 shrink-0">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-400 font-medium">Institution</p>
              <h3 className="text-base sm:text-lg font-semibold text-white mt-0.5">
                {EVENT_DETAILS.institution}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Celebrating student artistry and cultural harmony
              </p>
            </div>
          </div>
        </div>

        {/* Action Controls: Mark Your Calendar & Share */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
          <div className="w-full sm:w-auto flex flex-wrap items-center gap-3">
            {/* Download .ICS */}
            <button
              onClick={generateICSFile}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-300 text-slate-950 font-semibold text-xs sm:text-sm hover:from-amber-300 hover:to-amber-200 transition-all shadow-lg shadow-amber-500/20 active:scale-95"
              aria-label="Download calendar invite (.ics file)"
            >
              <Download className="w-4 h-4 text-slate-950" />
              <span>Mark your calendar (.ics)</span>
            </button>

            {/* Google Calendar Direct Link */}
            <a
              href={getGoogleCalendarUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 text-xs sm:text-sm font-medium text-slate-200 hover:text-white transition-all active:scale-95"
              aria-label="Add to Google Calendar (opens in new tab)"
            >
              <span>Add to Google Calendar</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>

          {/* Share Button */}
          <button
            onClick={handleShare}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-purple-950/40 hover:bg-purple-900/50 border border-purple-500/30 text-xs sm:text-sm font-medium text-purple-200 hover:text-white transition-all active:scale-95"
            aria-label="Share invitation"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-300">Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4 text-purple-300" />
                <span>Share Invitation</span>
              </>
            )}
          </button>
        </div>
      </motion.div>
    </section>
  );
}
