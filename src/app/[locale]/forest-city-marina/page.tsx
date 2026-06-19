import { createContentHubPage } from "@/lib/content-hub-page";

const { generateMetadata, default: Page } = createContentHubPage("forest-city-marina");

export { generateMetadata };
export default Page;
