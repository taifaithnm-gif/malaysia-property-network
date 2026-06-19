import { createContentHubPage } from "@/lib/content-hub-page";

const { generateMetadata, default: Page } = createContentHubPage("golf");

export { generateMetadata };
export default Page;
