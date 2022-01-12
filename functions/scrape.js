const cheerio = require('cheerio');
const axios = require('axios');

async function getPrayerTimes() {
  const prayerTimeNames = [];
  // Return value.
  const prayerTimes = {};
  // This page contains all the prayer times.
  // We will scrape this data using cheerio.
  const url = "https://www.islamicfinder.org/world/bangladesh/";
  const page = await await axios.get(url);
  const $ = cheerio.load(page.data);
  $('.zero-padding.large-12.column.text-center tr').each((index, data) => {
    // key is the location. We are storing time based on location.
    let key = "";
    $(data)
      .find("td")
      .each((TDindex, data) => {
        // The first row contains the header, which is indicates
        // time for which prayer. E.G. Fajr, Maghrib etc.
        if(!index) {
          prayerTimeNames.push($(data).text().trim());
        }
        // The first column contains the name of the place.
        else if (!TDindex) {
          key = $(data).text().trim();
          prayerTimes[key] = {};
        }
        // 
        else {
          //       [location][which time] = prayer time.
          prayerTimes[key][prayerTimeNames[TDindex]] = $(data).text().trim();
        }
      });
  });
  return prayerTimes;
}

const scrapeCSENotices = async (limit = 7) => {
  const notices = [];
  const map = new Map();
  map.set("January", 0);
  map.set("February", 1);
  map.set("March", 2);
  map.set("April", 3);
  map.set("May", 4);
  map.set("June", 5);
  map.set("July", 6);
  map.set("August", 7);
  map.set("September", 8);
  map.set("October", 9);
  map.set("November", 10);
  map.set("December", 11);
  const URL = "https://cse.uiu.ac.bd/notices/";

  const { data } = await axios.get(URL);
  const $ = cheerio.load(data);

  const noticePage = $("article > header > h2 > a");

  for (let i = 0; i < limit; i++) {
    const el = noticePage[i];

    const noticeUrl = el.attribs.href;
    const noticeTitle = el.children[0].data;
    let currNotice = {
      link: noticeUrl,
      title: noticeTitle,
      date: "",
      dateUTC: 0,
    };

    const datePage = $('span[class="pdate"]');

    for (let j = 0; j < 1; j++) {
      const elem = datePage[j];
      currNotice.date = elem.next.data;
      const stripped = currNotice.date.split(" ");
      currNotice.dateUTC = new Date(
        stripped[3],
        map.get(stripped[2].substring(0, stripped[2].length - 1)),
        stripped[1].replace(/\D/g, "")
      );
      notices.push(currNotice);
    }
  }


  return notices;
};

const scrapeEEENotices = async (limit = 7) => {
  const notices = [];
  const map = new Map();
  map.set("January", 0);
  map.set("February", 1);
  map.set("March", 2);
  map.set("April", 3);
  map.set("May", 4);
  map.set("June", 5);
  map.set("July", 6);
  map.set("August", 7);
  map.set("September", 8);
  map.set("October", 9);
  map.set("November", 10);
  map.set("December", 11);
  const URL = "https://eee.uiu.ac.bd/notices/";

  const { data } = await axios.get(URL);
  const $ = cheerio.load(data);

  const noticePage = $("article > header > h2 > a");

  for (let i = 0; i < limit; i++) {
    const el = noticePage[i];

    const noticeUrl = el.attribs.href;
    const noticeTitle = el.children[0].data;
    let currNotice = { link: noticeUrl, title: noticeTitle };
    
    notices.push(currNotice);
  }


  return notices;
};

const scrapeNotices = async (limit = 7) => {
  const notices = [];
  const map = new Map();
  map.set("January", 0);
  map.set("February", 1);
  map.set("March", 2);
  map.set("April", 3);
  map.set("May", 4);
  map.set("June", 5);
  map.set("July", 6);
  map.set("August", 7);
  map.set("September", 8);
  map.set("October", 9);
  map.set("November", 10);
  map.set("December", 11);
  const URL = "https://www.uiu.ac.bd/notices/";

  const { data } = await axios.get(URL);
  const $ = cheerio.load(data);

  const noticePage = $("article > header > h2 > a");

  for (let i = 0; i < limit; i++) {
    const el = noticePage[i];

    const noticeUrl = el.attribs.href;
    const noticeTitle = el.children[0].data;
    let currNotice = {
      link: noticeUrl,
      title: noticeTitle,
      date: "",
      dateUTC: 0,
    };

    const { data } = await axios.get(noticeUrl);
    const $$ = cheerio.load(data);

    const datePage = $$('span[class="pdate"]');

    for (let j = 0; j < datePage.length; j++) {
      const elem = datePage[j];
      currNotice.date = elem.next.data;
      const stripped = currNotice.date.split(" ");
      currNotice.dateUTC = new Date(
        stripped[3],
        map.get(stripped[2].substring(0, stripped[2].length - 1)),
        stripped[1].replace(/\D/g, "")
      );
      notices.push(currNotice);
    }
  }


  return notices;
};

module.exports.getPrayerTimes = getPrayerTimes;
module.exports.getNotices = scrapeNotices;
module.exports.getCSENotices = scrapeCSENotices;
module.exports.getEEENotices = scrapeEEENotices;

