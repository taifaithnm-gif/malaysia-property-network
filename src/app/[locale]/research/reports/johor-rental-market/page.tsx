import { createMarketReportPage } from "@/lib/market-report-page";

const { generateMetadata, default: Page } = createMarketReportPage("johor-rental-market");

export { generateMetadata };
export default Page;
