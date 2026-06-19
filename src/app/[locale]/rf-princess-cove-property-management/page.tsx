import { createOwnerLandingPage } from "@/lib/owner-landing-page";

const { generateMetadata, default: Page } = createOwnerLandingPage({
  slug: "rf-princess-cove-property-management",
  source: "rf-princess-cove-property-management",
  getLanding: (dict) => dict.ownerLanding.rfPrincessCove,
});

export { generateMetadata };
export default Page;
