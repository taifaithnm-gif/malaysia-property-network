import { createOwnerLandingPage } from "@/lib/owner-landing-page";

const { generateMetadata, default: Page } = createOwnerLandingPage({
  slug: "danga-bay-property-management",
  source: "danga-bay-property-management",
  getLanding: (dict) => dict.ownerLanding.dangaBay,
});

export { generateMetadata };
export default Page;
