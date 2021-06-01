import { crawl } from "./puppeteer/init";

(async () => {
  const data = await crawl("https://yoshimok.me");
})();
