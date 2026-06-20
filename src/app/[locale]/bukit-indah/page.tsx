import { createProjectProfilePage } from "@/lib/project-profile-page";

const { generateMetadata, default: Page } = createProjectProfilePage("bukit-indah");

export { generateMetadata };
export default Page;
