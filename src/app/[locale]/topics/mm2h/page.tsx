import { createTopicPage } from "@/lib/topic-page";

const { generateMetadata, default: Page } = createTopicPage("mm2h");

export { generateMetadata };
export default Page;
