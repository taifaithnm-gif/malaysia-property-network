import { createProjectGalleryPage } from "@/lib/project-gallery-page";

const { generateMetadata, default: Page } = createProjectGalleryPage("danga-bay");

export { generateMetadata };
export default Page;
