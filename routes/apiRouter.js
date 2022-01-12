const router = require('express').Router();

// User defined functions.
const { getWeatherData } = require('../functions/weatherapi');
const { getPrayerTimes } = require('../functions/scrape');

// Database functions.
const { Reminder } = require('../database/database');

router.get('/', (req, res) => {
  res.render('api');
});

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
  const allReminders = Reminder.find({});
  res.json(JSON.parse(allReminders));
})


module.exports = router;
