import { createProjectGalleryPage } from "@/lib/project-gallery-page";

const { generateMetadata, default: Page } = createProjectGalleryPage("bukit-indah");

export { generateMetadata };
export default Page;
