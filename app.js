const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// Getting data from API to our server
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {

  const weatherQuery = req.body.cityName;
  const apiKey = "345354e36355da67bea2dbfb29be6a2c";
  const units = "metric";

  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + weatherQuery + "&appid=" + apiKey + "&units=" + units;

  https.get(url, function (response) {
    console.log(response.statusCode);

    response.on("data", function (data) {
      const weatherData = JSON.parse(data)
      const temp = weatherData.main.temp
      const weatherDescription = weatherData.weather[0].description
      const weatherIcon = weatherData.weather[0].icon
      const imageURL = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png"
      console.log(temp, weatherDescription)
      res.write("<p> The weather is currently  " + weatherDescription + "</p>");
      res.write("<h1>The temperature in " + weatherQuery + " is " + temp + " degrees Celcius</h1>");
      res.write("<img src=" + imageURL + ">");
      res.send()
    })
  })

})

app.listen(process.env.PORT || 3000, function () {
  console.log("Server is running on port 3000.");
});