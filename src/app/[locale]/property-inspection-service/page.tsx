import { createServicePage } from "@/lib/service-page";

const { generateMetadata, default: Page } = createServicePage({
  slug: "property-inspection-service",
  source: "property-inspection-service",
  getService: (dict) => dict.services.propertyInspection,
});

export { generateMetadata };
export default Page;
