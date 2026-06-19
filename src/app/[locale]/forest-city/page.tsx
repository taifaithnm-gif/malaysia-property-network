import { createProjectProfilePage } from "@/lib/project-profile-page";

const { generateMetadata, default: Page } = createProjectProfilePage("forest-city");

export { generateMetadata };
export default Page;
