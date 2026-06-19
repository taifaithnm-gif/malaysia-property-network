import { createServicePage } from "@/lib/service-page";

const { generateMetadata, default: Page } = createServicePage({
  slug: "key-holding-service",
  source: "key-holding-service",
  getService: (dict) => dict.services.keyHolding,
});

export { generateMetadata };
export default Page;
