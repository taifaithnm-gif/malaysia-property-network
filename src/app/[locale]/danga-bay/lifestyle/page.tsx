import { createContentHubPage } from "@/lib/content-hub-page";

const { generateMetadata, default: Page } = createContentHubPage("danga-bay-lifestyle");

export { generateMetadata };
export default Page;
