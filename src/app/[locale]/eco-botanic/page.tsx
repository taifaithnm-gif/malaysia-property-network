import { createProjectProfilePage } from "@/lib/project-profile-page";

const { generateMetadata, default: Page } = createProjectProfilePage("eco-botanic");

export { generateMetadata };
export default Page;
