const axios = require("axios");
require('dotenv').config();

async function getWeatherData(area) {
  const url = `http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${area}&aqi=no`;
  const response = await axios.get(url);
  return response.data;
}

getWeatherData('dhaka')
.then(data => console.log(data));

