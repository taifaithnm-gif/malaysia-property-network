import { createContentHubPage } from "@/lib/content-hub-page";

const { generateMetadata, default: Page } = createContentHubPage("corporate-visits");

export { generateMetadata };
export default Page;
