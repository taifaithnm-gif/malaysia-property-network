import { createProjectGalleryPage } from "@/lib/project-gallery-page";

const { generateMetadata, default: Page } = createProjectGalleryPage("medini");

export { generateMetadata };
export default Page;
