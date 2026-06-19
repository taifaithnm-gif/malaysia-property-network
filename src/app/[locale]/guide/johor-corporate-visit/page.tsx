import { createSeoGuidePage } from "@/lib/seo-guide-page";

const { generateMetadata, default: Page } = createSeoGuidePage("johor-corporate-visit");

export { generateMetadata };
export default Page;
