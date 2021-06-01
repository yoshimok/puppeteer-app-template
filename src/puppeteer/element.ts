import puppeteer from "puppeteer";

export const getTxt = async (elm: any) => {
  const handler = await elm.getProperty("textContent");
  return String(await handler.jsonValue());
};

export const searchAnchor = async (page: puppeteer.Page) => {
  return await page.evaluate(() => {
    const list = Array.from(document.querySelectorAll("a"));
    const hrefs = list.map((data) => data.href);
    return hrefs;
  });
};

const getSample = async (page: puppeteer.Page): Promise<number | undefined> => {
  const xPath = '//span[@class="hogehoge"]';

  try {
    const element = await page.$x(xPath);
    if (!element[0]) {
      return;
    }
    const targetJSHandle = await element[0].getProperty("textContent");
    const acquired = String(await targetJSHandle.jsonValue());
  } catch (error) {}
};
