import { createProjectProfilePage } from "@/lib/project-profile-page";

const { generateMetadata, default: Page } = createProjectProfilePage("country-garden-danga-bay");

export { generateMetadata };
export default Page;
