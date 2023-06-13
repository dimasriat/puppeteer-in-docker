import puppeteer, { Browser } from "puppeteer";

async function createBrowser() {
  const browser = await puppeteer.launch({
    headless: "new",
    executablePath: "/usr/bin/chromium-browser",
    args: [
      "--disable-gpu",
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--no-zygote",
    ],
  });
  return browser;
}

async function createPage(browser: Browser, url: string) {
  const page = await browser.newPage();
  await page.goto(url);
  return page;
}

async function main() {
  const browser = await createBrowser();
  const page = await createPage(browser, "https://www.gakonst.com/");

  const pageTitle = await page.title();

  // snapshot and handle
  const h1 = await page.$$eval("#preamble > h1", (nodes) => {
    const headingTexts = nodes.map((node) => node.innerText);
    return headingTexts;
  });

  console.log({ pageTitle, h1 });

  await browser.close();
}

main();
