import { createContentHubPage } from "@/lib/content-hub-page";

const { generateMetadata, default: Page } = createContentHubPage("princess-cove-ciq");

export { generateMetadata };
export default Page;
