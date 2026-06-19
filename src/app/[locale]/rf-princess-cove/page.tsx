import { createProjectProfilePage } from "@/lib/project-profile-page";

const { generateMetadata, default: Page } = createProjectProfilePage("rf-princess-cove");

export { generateMetadata };
export default Page;
