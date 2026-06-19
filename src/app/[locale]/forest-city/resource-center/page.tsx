import { createProjectArchivePage } from "@/lib/project-archive-page";

const { generateMetadata, default: Page } = createProjectArchivePage("forest-city-resource-center");

export { generateMetadata };
export default Page;
