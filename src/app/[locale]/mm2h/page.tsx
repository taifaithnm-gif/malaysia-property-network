import { createContentHubPage } from "@/lib/content-hub-page";

const { generateMetadata, default: Page } = createContentHubPage("mm2h");

export { generateMetadata };
export default Page;
