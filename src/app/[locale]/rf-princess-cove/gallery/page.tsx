import { createProjectGalleryPage } from "@/lib/project-gallery-page";

const { generateMetadata, default: Page } = createProjectGalleryPage("rf-princess-cove");

export { generateMetadata };
export default Page;
