import { createProjectArchivePage } from "@/lib/project-archive-page";

const { generateMetadata, default: Page } = createProjectArchivePage("rf-princess-cove-archive");

export { generateMetadata };
export default Page;
