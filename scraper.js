const puppeteer = require('puppeteer');

const organizersList = ['wtm', 'google', 'shape', 'master21', 'techmakers'];
const topicsList = [
  'ruby',
  'rails',
  'javascript',
  'vue.js',
  'vue',
  'angular',
  'react',
  'coding'
];

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://techevents.co/places/z%C3%BCrich-switzerland/12438');

  let events = await page.$$('.item-event-details');
  let firstEvent = await page.$('.item-event-details');

  for (const event of events) {
    // Get organizers name
    let organizerName = await event.$eval(
      '.organizer-name .track-outbound-link',
      link => link.innerText.toLowerCase()
    );
    const orgNameWords = organizerName.split(' ');

    // Get event title
    let eventTitle = await event.$eval(
      '.item-event-title .track-outbound-link',
      link => link.innerText.toLowerCase()
    );
    const eventTitleWords = eventTitle.split(' ');

    if (organizersList.some(value => orgNameWords.includes(value))) {
      console.log('true');
      const eventLink = await event.$eval(
        '.item-event-title .track-outbound-link',
        link => link.href
      );
      console.log(eventLink);
    } else if (topicsList.some(value => eventTitleWords.includes(value))) {
      console.log('true');
      const eventLink = await event.$eval(
        '.item-event-title .track-outbound-link',
        link => link.href
      );
      console.log(eventLink);
    }
  }

  await browser.close();
})();

// run script: node --inspect scraper.js
