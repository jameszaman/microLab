const router = require('express').Router();

// User defined functions.
const { getWeatherData } = require('../functions/weatherapi');
const { getPrayerTimes, getNotices, getCSENotices, getEEENotices } = require('../functions/scrape');

// Database functions.
const { Reminder } = require('../database/database');

router.get('/', (req, res) => {
  res.render('api');
});

router.get('/notice', async (req, res) => {
  let notice = {};
  if(req.query.department == 'cse') {
    notice = await getCSENotices();
  }
  else if(req.query.department == 'eee') {
    notice = await getEEENotices();
  }
  else {
    notice = await getNotices();
  }
  res.json(notice);
})

router.get('/weather', async (req, res) => {
  // If a place is given that is the new place
  // The default place is dhaka.
  let place = req.query['place'] || 'Dhaka';

  const weatherData = await getWeatherData(place);
  res.json(weatherData);
});

router.get('/prayertime', async (req, res) => {
  let prayerTimes = await getPrayerTimes();
  // If specified, give that specific prayer time.
  if(req.query['place']) {
    prayerTimes = prayerTimes[req.query['place']];
  }
  res.json(prayerTimes);
})

router.get('/reminder', async (req, res) => {
  const allReminders = await Reminder.find({});
  res.json(allReminders);
})


module.exports = router;
