import { createProjectProfilePage } from "@/lib/project-profile-page";

const { generateMetadata, default: Page } = createProjectProfilePage("mount-austin");

export { generateMetadata };
export default Page;
