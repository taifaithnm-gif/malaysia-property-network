import { createOwnerLandingPage } from "@/lib/owner-landing-page";

const { generateMetadata, default: Page } = createOwnerLandingPage({
  slug: "owners",
  source: "owners-landing",
  getLanding: (dict) => dict.ownerLanding.owners,
});

export { generateMetadata };
export default Page;
