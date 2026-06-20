import { createProjectGalleryPage } from "@/lib/project-gallery-page";

const { generateMetadata, default: Page } = createProjectGalleryPage("country-garden-danga-bay");

export { generateMetadata };
export default Page;
