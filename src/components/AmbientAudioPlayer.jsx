import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Play, Pause, Music2, Info } from "lucide-react";
import { EVENT_DETAILS } from "../config/eventData";
import { ambientSynth } from "../utils/audioSynth";

export default function AmbientAudioPlayer({ autoPlayTrigger }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [usingFallbackSynth, setUsingFallbackSynth] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const audioRef = useRef(null);

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio(EVENT_DETAILS.audioPath);
    audio.preload = "auto";
    audio.loop = false;
    audioRef.current = audio;

    const startTime = EVENT_DETAILS.audioStartTime || 0;

    const handleLoadedMetadata = () => {
      if (audio.currentTime < startTime) {
        audio.currentTime = startTime;
      }
    };

    // When song reaches the end, loop back to specified start time (1m 33s)
    const handleEnded = () => {
      audio.currentTime = startTime;
      audio.play().catch(() => {});
    };

    // Error handling: if file doesn't exist or cannot be decoded
    const handleError = () => {
      // Audio file missing or invalid: gracefully use ambient synth
      setUsingFallbackSynth(true);
      if (isPlaying) {
        ambientSynth.start();
      }
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("canplay", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("canplay", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
      audio.pause();
      ambientSynth.stop();
    };
  }, []);

  // Trigger playback when visitor accepts (clicks "Yes")
  useEffect(() => {
    if (autoPlayTrigger && !hasInteracted) {
      setHasInteracted(true);
      playAudio();
    }
  }, [autoPlayTrigger]);

  const playAudio = async () => {
    setAutoplayBlocked(false);
    if (usingFallbackSynth) {
      ambientSynth.start();
      setIsPlaying(true);
      return;
    }

    if (audioRef.current) {
      try {
        const startTime = EVENT_DETAILS.audioStartTime || 0;
        if (audioRef.current.currentTime < startTime) {
          audioRef.current.currentTime = startTime;
        }
        await audioRef.current.play();
        setIsPlaying(true);
        setAutoplayBlocked(false);
      } catch (err) {
        // Browser autoplay prevented or file issue
        if (err.name === "NotAllowedError") {
          setAutoplayBlocked(true);
        } else {
          // Fall back to ambient synthesizer
          setUsingFallbackSynth(true);
          ambientSynth.start();
          setIsPlaying(true);
        }
      }
    }
  };

  const pauseAudio = () => {
    if (usingFallbackSynth) {
      ambientSynth.stop();
    } else if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  };

  const toggleMute = () => {
    if (usingFallbackSynth) {
      const nextMuted = !isMuted;
      setIsMuted(nextMuted);
      ambientSynth.setVolume(nextMuted ? 0 : 1);
    } else if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <aside 
      aria-label="Event Audio Player"
      className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2"
    >
      {/* Autoplay blocked gentle prompt */}
      {autoplayBlocked && (
        <button
          onClick={playAudio}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-amber-400/90 text-slate-950 shadow-lg shadow-amber-500/20 hover:bg-amber-300 transition-all transform hover:scale-105 active:scale-95 animate-bounce"
        >
          <Music2 className="w-3.5 h-3.5" />
          <span>Tap to play music</span>
        </button>
      )}

      {/* Info tooltip about custom song location */}
      {showTooltip && (
        <div className="max-w-xs p-3 rounded-xl bg-slate-900/95 border border-purple-500/30 text-xs text-slate-200 shadow-2xl backdrop-blur-md transition-all animate-fadeIn">
          <p className="font-semibold text-amber-300 mb-1 flex items-center gap-1.5">
            <Music2 className="w-3.5 h-3.5" />
            Audio Track Integration
          </p>
          <p className="text-slate-300 leading-relaxed">
            {usingFallbackSynth
              ? "Playing ambient theme. To play your official track, drop your MP3 into public/audio/fusion-song.mp3"
              : `Playing: ${EVENT_DETAILS.audioTitle} • Artist: ${EVENT_DETAILS.audioArtist}`}
          </p>
        </div>
      )}

      {/* Floating Audio Bar */}
      <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-slate-950/70 border border-white/10 backdrop-blur-xl shadow-2xl hover:border-purple-500/40 transition-all duration-300 group">
        {/* Animated Equalizer Waveform */}
        <div className="flex items-end gap-[3px] h-4 w-4" aria-hidden="true">
          <span
            className={`w-[3px] bg-gradient-to-t from-purple-500 to-amber-400 rounded-full transition-all duration-200 ${
              isPlaying
                ? "h-full animate-[pulse_0.6s_ease-in-out_infinite]"
                : "h-1.5 opacity-40"
            }`}
          />
          <span
            className={`w-[3px] bg-gradient-to-t from-purple-500 to-amber-400 rounded-full transition-all duration-300 ${
              isPlaying
                ? "h-3/4 animate-[pulse_0.8s_ease-in-out_infinite_0.2s]"
                : "h-2 opacity-40"
            }`}
          />
          <span
            className={`w-[3px] bg-gradient-to-t from-purple-500 to-amber-400 rounded-full transition-all duration-200 ${
              isPlaying
                ? "h-full animate-[pulse_0.5s_ease-in-out_infinite_0.4s]"
                : "h-1 opacity-40"
            }`}
          />
        </div>

        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className="p-1.5 rounded-full hover:bg-white/10 text-slate-200 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400/50"
          title={isPlaying ? "Pause music" : "Play music"}
          aria-label={isPlaying ? "Pause event soundtrack" : "Play event soundtrack"}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>

        {/* Mute/Unmute Button */}
        <button
          onClick={toggleMute}
          className="p-1.5 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400/50"
          title={isMuted ? "Unmute" : "Mute"}
          aria-label={isMuted ? "Unmute sound" : "Mute sound"}
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
        </button>

        {/* Track Label */}
        <span className="text-xs font-medium text-slate-300 hidden sm:inline max-w-[130px] truncate select-none">
          {usingFallbackSynth ? "Ambient Chimes" : "FUSION Anthem"}
        </span>

        {/* Info button */}
        <button
          onClick={() => setShowTooltip((prev) => !prev)}
          className="p-1 rounded-full text-slate-400 hover:text-amber-300 transition-colors"
          title="Track details & instructions"
          aria-label="Track details and replacement instructions"
        >
          <Info className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
}
