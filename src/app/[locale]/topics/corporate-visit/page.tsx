import { createTopicPage } from "@/lib/topic-page";

const { generateMetadata, default: Page } = createTopicPage("corporate-visit");

export { generateMetadata };
export default Page;
