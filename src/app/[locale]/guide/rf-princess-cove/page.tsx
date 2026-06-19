import { createSeoGuidePage } from "@/lib/seo-guide-page";

const { generateMetadata, default: Page } = createSeoGuidePage("rf-princess-cove");

export { generateMetadata };
export default Page;
