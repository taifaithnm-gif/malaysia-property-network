import { createProjectArchivePage } from "@/lib/project-archive-page";

const { generateMetadata, default: Page } = createProjectArchivePage("danga-bay-archive");

export { generateMetadata };
export default Page;
