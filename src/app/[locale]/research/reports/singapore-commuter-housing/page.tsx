import { createMarketReportPage } from "@/lib/market-report-page";

const { generateMetadata, default: Page } = createMarketReportPage("singapore-commuter-housing");

export { generateMetadata };
export default Page;
