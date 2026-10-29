/**
 * FUSION 2026 — Configuration & Event Data
 * All event text, details, witty responses, and audio paths are centralized here
 * for easy customization.
 */

export const EVENT_DETAILS = {
  name: "FUSION 2026",
  tagline: "Where Rhythm Meets Artistry",
  presentedBy: "Ninad × Natraj",
  institution: "GLA University",
  dateFormatted: "3 November 2026",
  dateISO: "2026-11-03T16:00:00+05:30",
  timeFormatted: "4:00 PM onwards",
  venue: "KC Ground, GLA University",
  venueSubtext: "Main Campus, Mathura, Uttar Pradesh",
  
  // Audio configuration
  // Place your audio file at /public/audio/fusion-song.mp3
  // Or change this path to any local or web audio stream URL.
  audioPath: "/audio/fusion-song.mp3",
  audioTitle: "FUSION 2026 Anthem",
  audioArtist: "Anupam Paul",
  audioStartTime: 93, // 1 minute 33 seconds (93s) till end
  contactEmail: "vaishnavii0923@gmail.com",

  // Clubs info
  clubs: {
    ninad: {
      name: "Ninad",
      tagline: "The Soulful Sound of GLA",
      role: "Music & Acoustic Arts",
      accent: "#F5BE47",
    },
    natraj: {
      name: "Natraj",
      tagline: "The Kinetic Pulse of Expression",
      role: "Dance & Choreography",
      accent: "#A855F7",
    },
  },

  // Central invitation question
  invitationQuestion: "You are cordially invited to FUSION 2026. Will you be joining us for an unforgettable evening?",
  
  // RSVP button labels
  yesButtonLabel: "Yes, I’ll be there",
  noButtonLabel: "No, I can’t make it",

  // Acceptance texts
  acceptance: {
    badge: "INVITATION ACCEPTED",
    headline: "IT’S A YES! YOU’RE ON THE LIST.",
    subhead: "Your place at FUSION 2026 awaits.",
    message: "Thank you for accepting our invitation. Get ready for an evening where rhythm meets artistry and two vibrant cultures come together as one.",
  },

  // Playful reconsideration messages for the 'No' button
  noMessages: [
    "Are you sure? An evening like this deserves a second thought.",
    "Ninad × Natraj, one stage, one unforgettable night. Think again?",
    "We’d hate for you to miss the magic. Give it another thought?",
    "Your presence would make the evening even more special.",
    "One little click could make your November evening legendary.",
    "We respect your decision… but may we tempt you once more?",
    "The music, the energy, the memories — are you sure you want to miss all three?",
    "Final reconsideration? FUSION won’t be quite the same without you.",
  ],
};
