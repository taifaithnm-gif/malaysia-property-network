import { createSeoGuidePage } from "@/lib/seo-guide-page";

const { generateMetadata, default: Page } = createSeoGuidePage("forest-city");

export { generateMetadata };
export default Page;
