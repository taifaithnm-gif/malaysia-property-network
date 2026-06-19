import { createContentHubPage } from "@/lib/content-hub-page";

const { generateMetadata, default: Page } = createContentHubPage("danga-bay-family-living");

export { generateMetadata };
export default Page;
