// Single source of truth for business details shown on the site.
// 100% static site: there is no backend. Every order / quote button opens WhatsApp with a ready message.
// Keep index.html's JSON-LD (phone, address, map, social links, hours) in sync when you change anything here.
export const BUSINESS = {
  logo: "/logo.png",
  name: "Technique Printing LLC",
  siteUrl: "https://www.techniqueprinting.ae",
  addressLine: "Shop No: WKB-13 / WKB-09, Inside Dragon Mart 1, International City, Dubai, UAE",
  // Phone for the "Call" buttons. Same number as WhatsApp for now: change here if you want a different call number.
  phoneDisplay: "+971 52 943 0708",
  phoneTel: "+971529430708",
  whatsappUrl: "https://wa.me/971529430708",
  email: "", // Add a real business email here to show it in the footer and on the Contact page.
  // Social links. They are shown ONLY in the website footer.
  instagramUrl: "https://www.instagram.com/technique_print/",
  facebookUrl: "https://www.facebook.com/techniqueprintingdubai/",
  youtubeUrl: "https://www.youtube.com/@Technique-print/",
  // TODO: replace with the real store schedule (one row per group of days).
  hoursList: [{ days: "Every day", time: "10:00 am - 10:00 pm" }],
  // Technique Printing LLC, Dragon Mart 1 (25.1758035, 55.4138165).
  mapsUrl: "https://www.google.com/maps/place/Technique+Printing+LLC/@25.1758035,55.4138165,1093m/data=!3m1!1e3!4m6!3m5!1s0x3e5f6169261da667:0x9c251e844886460b!8m2!3d25.1750035!4d55.4138165!16s%2Fg%2F11xm24tghb?entry=ttu&g_ep=EgoyMDI2MTExOC4xIKXMDSoASAFQAw%3D%3D",
  directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=25.1758035%2C55.4138165&travelmode=driving",
  // Place embed for "Technique Printing LLC", centred on the shop at about zoom 17.
  mapEmbedSrc:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1100!2d55.4138165!3d25.1758035!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6169261da667%3A0x9c251e844886460b!2sTechnique%20Printing%20LLC!5e0!3m2!1sen!2sae!4v1794490410143!5m2!1sen!2sae",
};
BUSINESS.hours = BUSINESS.hoursList.map((h) => `${h.days}: ${h.time}`).join(" · ");

// WhatsApp link (official number). Optional text = the pre-filled message.
export const waLink = (text = "") => (text ? `${BUSINESS.whatsappUrl}?text=${encodeURIComponent(text)}` : BUSINESS.whatsappUrl);

// "Get quote" buttons: open WhatsApp with the service name already typed.
export const quoteLink = (name) =>
  waLink(`Hello Technique Printing! 👋\nI would like a quote for: ${name}\n\nQuantity:\nSize / details:\nDeadline:`);
