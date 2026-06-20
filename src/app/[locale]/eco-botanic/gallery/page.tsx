import { createProjectGalleryPage } from "@/lib/project-gallery-page";

const { generateMetadata, default: Page } = createProjectGalleryPage("eco-botanic");

export { generateMetadata };
export default Page;
