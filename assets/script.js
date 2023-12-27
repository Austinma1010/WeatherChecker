var search = document.getElementById('searchBtn');
var cityName = document.getElementById("cityName");
var stateName = document.getElementById("stateName");
var countryName = document.getElementById("countryName");
var displayEl = document.getElementById("display");
var presentEl = document.getElementById("present");
var futureEl = document.getElementById("future");
var showCityName = document.getElementById("selectedCity");
var currentWeather = document.getElementById("currentWeather");

search.addEventListener('click', geoData);

function geoData() {
  
  
    var requestUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName.value + "," + stateName.value + "," + countryName.value + "&limit=1&appid=5b96ab0189348a63ef62caf75d4120ff";
    
fetch(requestUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    var latitude = data[0].lat;
    var longitude = data[0].lon;
    console.log(latitude);
    getWeather(latitude, longitude);

})

}



function getForecast(lat, lon) {
    var requestUrl = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=aa3fbae0a4e68296f1ce493a844937a7";

fetch(requestUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    var date = data.list[8].dt_txt;
    date = date.split(' ');
    date.pop();
    console.log(date.toString());


})
}

function getWeather(lat, lon) {
  var requestUrl = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=imperial&lang=en&appid=aa3fbae0a4e68296f1ce493a844937a7";

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      
      var temp = data.main.temp;
      var wind = data.wind.speed;
      var humidity = data.main.humidity;
      console.log(data.main.humidity)

      showCurrentWeather(temp, wind, humidity);

    
  
  })
}

function showCurrentWeather(temp, wind, humidity) {
  displayEl.setAttribute('class', 'display');
  presentEl.setAttribute('class', 'present');
  showCityName.textContent = cityName.value;
  tempEl = currentWeather.appendChild(document.createElement('li'));
  tempEl.textContent = "Tempature: " + temp + " degrees fahrenheit";

  windEl = currentWeather.appendChild(document.createElement('li'));
  windEl.textContent = "Wind Speed: " + wind + "mph";

  humidityEl = currentWeather.appendChild(document.createElement('li'));
  humidityEl.textContent = "Humidity: " + humidity;


}