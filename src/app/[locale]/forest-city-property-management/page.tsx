import { createOwnerLandingPage } from "@/lib/owner-landing-page";

const { generateMetadata, default: Page } = createOwnerLandingPage({
  slug: "forest-city-property-management",
  source: "forest-city-property-management",
  getLanding: (dict) => dict.ownerLanding.forestCity,
});

export { generateMetadata };
export default Page;
