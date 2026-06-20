import { createMarketReportPage } from "@/lib/market-report-page";

const { generateMetadata, default: Page } = createMarketReportPage("forest-city-owner");

export { generateMetadata };
export default Page;
