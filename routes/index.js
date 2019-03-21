const express = require('express');
const request = require('request');
const router = express.Router();

router.get('/', (req, res) => {
    let city = 'saharanpur';
    let url = process.env.WEATHER_API + city + "&appid=" + process.env.WEATHER_API_KEY;
    request(url, function (err, response, body) {
        if (err) throw err;
        else {
            let weather = JSON.parse(body);
            let weatherForecast = weather.list;
            res.render('index', {weather: weatherForecast, place: ''});
        }
    });
});

router.post('/', (req, res) => {
    let city = req.body.searchplace;
    let url = process.env.WEATHER_API + city + "&appid=" + process.env.WEATHER_API_KEY;
    console.log(url)
    request(url, function (err, response, body) {
        if (err) throw err;
        else {
            let weather = JSON.parse(body);
            let weatherForecast = weather.list;

            let data = [
                {
                    date: (new Date(weatherForecast[0].dt * 1000)).toString().slice(0,15),
                    temp: (weatherForecast[0].main.temp - 273.15).toString().slice(0,5),
                    humidity: weatherForecast[0].main.humidity,
                    status: weatherForecast[0].weather[0].description
                },
                {
                    date: (new Date(weatherForecast[8].dt * 1000)).toString().slice(0,15),
                    temp: (weatherForecast[8].main.temp - 273.15).toString().slice(0,5),
                    humidity: weatherForecast[8].main.humidity,
                    status: weatherForecast[8].weather[0].description
                },
                {
                    date: (new Date(weatherForecast[16].dt * 1000)).toString().slice(0,15),
                    temp: (weatherForecast[16].main.temp - 273.15).toString().slice(0,5),
                    humidity: weatherForecast[16].main.humidity,
                    status: weatherForecast[16].weather[0].description
                },
                {
                    date: (new Date(weatherForecast[24].dt * 1000)).toString().slice(0,15),
                    temp: (weatherForecast[24].main.temp - 273.15).toString().slice(0,5),
                    humidity: weatherForecast[24].main.humidity,
                    status: weatherForecast[24].weather[0].description
                }
            ];

            res.render('index', {weather: data, place: req.body.searchplace});
        }
    });
});

module.exports = router;