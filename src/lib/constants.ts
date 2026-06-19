export const SITE_NAME = "Malaysia Property Network";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://malaysiapropertynetwork.com";

export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "60123456789";

export const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hi, I'm an overseas property owner interested in your management services.",
);

export const LOCALES = ["en", "zh"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export const NAV_LINKS = [
  { href: "", key: "home" },
  { href: "services", key: "services" },
  { href: "property-management", key: "propertyManagement" },
  { href: "johor-bahru", key: "johorBahru" },
  { href: "forest-city", key: "forestCity" },
  { href: "rf-princess-cove", key: "rfPrincessCove" },
  { href: "danga-bay", key: "dangaBay" },
  { href: "about", key: "about" },
  { href: "contact", key: "contact" },
] as const;

export const LOCATION_SLUGS = [
  "johor-bahru",
  "forest-city",
  "rf-princess-cove",
  "danga-bay",
] as const;
