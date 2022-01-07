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

module.exports.getPrayerTimes = getPrayerTimes;

