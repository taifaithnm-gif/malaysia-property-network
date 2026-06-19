import { createServicePage } from "@/lib/service-page";

const { generateMetadata, default: Page } = createServicePage({
  slug: "airbnb-coordination-service",
  source: "airbnb-coordination-service",
  getService: (dict) => dict.services.airbnbCoordination,
});

export { generateMetadata };
export default Page;
