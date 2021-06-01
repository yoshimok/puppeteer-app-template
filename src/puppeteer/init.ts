import puppeteer from "puppeteer";

export const crawl = async (url: string /*, func: (page: puppeteer.Page) => {}*/): Promise<any> => {
  const browser = await puppeteer.launch({
    headless: true,
    // slowMo: 1000,
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();

  // 実動作
  await page.goto(url);

  await browser.close();

  return {};
};

type AuthInfo = {
  name: string;
  pass: string;
};

const auth = async (page: puppeteer.Page, authInfo: AuthInfo) => {
  await page.goto("LOGIN_PAGE", { timeout: 90000 });

  const elInputName = await page.$("input#username");
  const elInputPass = await page.$("input#password");
  const elSubmit = await page.$("input#submitlogin");

  // 認証
  await elInputName?.type(authInfo.name);
  await elInputPass?.type(authInfo.pass);

  await elSubmit?.click();
  await page.waitForSelector("");
};
