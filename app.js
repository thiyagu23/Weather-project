const express = require('express');
const bodyParser = require("body-parser")
const https = require('https');

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));


app.get("/", function(req, res) {
  res.sendfile(__dirname + "/index.html")
});

app.post("/", function(req, res) {
  const query = req.body.cityName
  const unit = "metric"
  const apiKey = "39c6064c93e99c37f48be09bd8df197b"

  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + unit + "&appid=" + apiKey + "";

  https.get(url, function(res1) {
    console.log(res1.statusCode);

    res1.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"

      res.write("<p>The weather currently " + description + ".<p>");
      res.write("<h1>The  temperature in " + query + " is " + temp + " degrees celcius.</h1>");
      res.write("<img src=" + imgURL + ">")
      res.send();
    });
  });
});

app.listen(3000, function() {
  console.log("server is running");
})
