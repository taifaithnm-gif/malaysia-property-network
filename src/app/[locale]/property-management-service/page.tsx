import { createServicePage } from "@/lib/service-page";

const { generateMetadata, default: Page } = createServicePage({
  slug: "property-management-service",
  source: "property-management-service",
  getService: (dict) => dict.services.propertyManagementService,
});

export { generateMetadata };
export default Page;
