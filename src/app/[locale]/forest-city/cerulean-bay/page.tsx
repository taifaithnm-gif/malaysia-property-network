import { createBuildingProfilePage } from "@/lib/building-profile-page";

const { generateMetadata, default: Page } = createBuildingProfilePage("cerulean-bay");

export { generateMetadata };
export default Page;
