import { createTopicPage } from "@/lib/topic-page";

const { generateMetadata, default: Page } = createTopicPage("golf-travel");

export { generateMetadata };
export default Page;
