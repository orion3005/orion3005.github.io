function dateTime() {
  const date = new Date();
  let today = date.toDateString();
  let time = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  document.getElementById("date-time").innerHTML =
    '<p id="date">' + today + '</p><p id="time">' + time + "</p>";
  setTimeout(dateTime, 1000);
}

function weatherBalloon(cityID) {
  var apiKey = "f82538e6b682e99f920385241e7a079f"; //OpenWeather API key
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?id=" +
      cityID +
      "&appid=" +
      apiKey,
  )
    .then(function (resp) {
      return resp.json();
    })
    .then(function (data) {
      let weatherIcon = data.weather[0].icon;
      let tempK = parseFloat(data.main.temp);
      let tempC = Math.round(tempK - 273.15);
      let tempF = Math.round((tempK - 273.15) * 1.8) + 32;
      document.getElementById("weather").innerHTML =
        '<a href="https://openweathermap.org/city/5368361" target="_blank" class="weather-link">' +
        '<p id="location">' +
        data.name +
        "</p>" +
        '<p id="details" title="' +
        tempC +
        '&deg;C">' +
        '<img src="https://openweathermap.org/img/wn/' +
        weatherIcon +
        '.png">' +
        data.weather[0].description +
        '<span class="separator">|</span>' +
        tempF +
        "&deg;F</p>" +
        "</a>";
    });
}

function traichu() {
  dateTime();
  weatherBalloon(5368361); //OpenWeather city ID
}
