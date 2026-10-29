/**
 * Calendar utility for generating .ics downloads and Google Calendar links
 */

export function generateICSFile() {
  const event = {
    title: "FUSION 2026 — Ninad × Natraj",
    description: "You are cordially invited to FUSION 2026, an unforgettable collaborative cultural celebration presented by Ninad × Natraj at GLA University. Where rhythm meets artistry.",
    location: "KC Ground, GLA University, Mathura, UP, India",
    // 3 November 2026, 4:00 PM IST (UTC+05:30 -> 10:30 UTC)
    startUTC: "20261103T103000Z",
    // 3 November 2026, 10:00 PM IST (UTC+05:30 -> 16:30 UTC)
    endUTC: "20261103T163000Z",
  };

  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//GLA University//FUSION 2026//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:fusion-2026-${Date.now()}@gla.ac.in`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z`,
    `DTSTART:${event.startUTC}`,
    `DTEND:${event.endUTC}`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${event.description}`,
    `LOCATION:${event.location}`,
    "STATUS:CONFIRMED",
    "BEGIN:VALARM",
    "TRIGGER:-PT24H",
    "ACTION:DISPLAY",
    "DESCRIPTION:Reminder: FUSION 2026 is tomorrow at KC Ground!",
    "END:VALARM",
    "BEGIN:VALARM",
    "TRIGGER:-PT2H",
    "ACTION:DISPLAY",
    "DESCRIPTION:Reminder: FUSION 2026 starts in 2 hours at KC Ground!",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute("download", "FUSION_2026_Ninad_x_Natraj.ics");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(link.href);
}

export function getGoogleCalendarUrl() {
  const title = encodeURIComponent("FUSION 2026 — Ninad × Natraj");
  const details = encodeURIComponent(
    "You are cordially invited to FUSION 2026, a premier collaborative cultural event presented by Ninad × Natraj at GLA University. Where rhythm meets artistry."
  );
  const location = encodeURIComponent("KC Ground, GLA University, Mathura");
  // 3 Nov 2026 16:00 IST = 10:30 UTC to 22:00 IST = 16:30 UTC
  const dates = "20261103T103000Z/20261103T163000Z";

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
}
