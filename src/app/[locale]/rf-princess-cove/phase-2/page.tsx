import { createBuildingProfilePage } from "@/lib/building-profile-page";

const { generateMetadata, default: Page } = createBuildingProfilePage("rf-phase-2");

export { generateMetadata };
export default Page;
