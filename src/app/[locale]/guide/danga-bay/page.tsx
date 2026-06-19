import { createSeoGuidePage } from "@/lib/seo-guide-page";

const { generateMetadata, default: Page } = createSeoGuidePage("danga-bay");

export { generateMetadata };
export default Page;
