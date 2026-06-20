import { createBuildingProfilePage } from "@/lib/building-profile-page";

const { generateMetadata, default: Page } = createBuildingProfilePage("rf-phase-3");

export { generateMetadata };
export default Page;
