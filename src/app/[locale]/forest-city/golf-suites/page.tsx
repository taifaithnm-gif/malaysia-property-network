import { createBuildingProfilePage } from "@/lib/building-profile-page";

const { generateMetadata, default: Page } = createBuildingProfilePage("golf-suites");

export { generateMetadata };
export default Page;
