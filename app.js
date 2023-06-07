// Weather App
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require("https");

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/page.html");
});

app.post("/", function (req, res) {
  const cityName = req.body.cityName;
  const apiKey = "ddca606bd2352b794fddd4af44012a63"; // Replace with your actual API key

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;
  
  https.get(url, function (response) {
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temperature = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageUrl = `http://openweathermap.org/img/wn/${icon}.png`;

      res.write(`<h1>The temperature in ${cityName} is ${temperature} degrees Fahrenheit</h1>`);
      res.write(`<p>The weather description is ${description}</p>`);
      res.write(`<img src="${imageUrl}" alt="Weather Icon">`);
      res.send();
    });
  });
});

app.listen(9000, function () {
  console.log("Server started on port 9000");
});



