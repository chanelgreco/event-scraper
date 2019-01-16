const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://techevents.co/places/z%C3%BCrich-switzerland/12438');
  await page.screenshot({ path: 'techevents.png' });

  await browser.close();
})();
