// WEATHER APP

// These are the packages we will use for our application
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require("https");

// Setting middleware on our API
app.use(bodyParser.urlencoded({ extended: true }));

// Handle GET requests to the route below / it will take you to the Page.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/page.html");
});

// Handle POST requests to the route below /.  Will check for a location in the request body and use this value 
// as a query parameter in the request to the weather API.
app.post("/", function (req, res) {
  const location = req.body.location;
  const apiKey = "ddca606bd2352b794fddd4af44012a63"; // My apikey from openweather

  // Below validates the input to see if it is a string(cityname) or a number(zip) and will use it as either a query paramenter or zip pararameter
  let url;
  if (isNaN(location)) {
    // City name is provided
    url = `https://api.openweathermap.org/data/2.5/weather?q=${location},US&appid=${apiKey}&units=imperial`;
  } else {
    // Zip code is provided
    url = `https://api.openweathermap.org/data/2.5/weather?zip=${location},US&appid=${apiKey}&units=imperial`;
  }

  // Send get request to the url established above
  https.get(url, function (response) {
    let responseData = "";

    response.on("data", function (data) {
      responseData = responseData + data;
    });

    response.on("end", function () {
      const jsondata = JSON.parse(responseData);

      console.log(jsondata)

      const lat = jsondata.coord.lat;
      const lon = jsondata.coord.lon;

      const url2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
      https.get(url2, function (response) {
        let responseData2 = "";

        response.on("data", function (data) {
          responseData2 = responseData2 + data;
        });

        response.on("end", function () {
          const jsondata2 = JSON.parse(responseData2);
          const temp = jsondata2.main.temp;
          const descrip = jsondata2.weather[0].description;
          const icon = jsondata2.weather[0].icon;
          const imageurl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    

          res.write(`<h1>The temp in ${location} is ${temp} degrees</h1><br>`);
          res.write(`<p>The weather description is ${descrip}</p><br>`);
          res.write(`<img src="${imageurl}"><br>`);
          res.end();
        });
      });
    });
  });
});

app.listen(9000);

