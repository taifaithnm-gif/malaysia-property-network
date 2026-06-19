import { createProjectProfilePage } from "@/lib/project-profile-page";

const { generateMetadata, default: Page } = createProjectProfilePage("danga-bay");

export { generateMetadata };
export default Page;
