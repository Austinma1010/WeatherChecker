var search = document.getElementById('searchBtn');
var cityName = document.getElementById("cityName");
var stateName = document.getElementById("stateName");
var countryName = document.getElementById("countryName");
var displayEl = document.getElementById("display");
var presentEl = document.getElementById("present");
var futureEl = document.getElementById("future");
var showCityName = document.getElementById("selectedCity");
var currentWeather = document.getElementById("currentWeather");
var saveBtn = document.getElementById('saveBtn');
var clearBtn = document.getElementById('clearSave');


clearBtn.addEventListener('click', clearLocalStorage);
search.addEventListener('click', function() {
  geoData(cityName.value);
});
saveBtn.addEventListener('click', function() {
  saveLocation(cityName.value)
});
showSaved();


function geoData(city) {
  
  
    var requestUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=5b96ab0189348a63ef62caf75d4120ff";
    
fetch(requestUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    
    var latitude = data[0].lat;
    var longitude = data[0].lon;
    
    getWeather(city, latitude, longitude);
    getForecast(latitude, longitude);

})

}



function getForecast(lat, lon) {
    var requestUrl = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=aa3fbae0a4e68296f1ce493a844937a7";

fetch(requestUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {

    
   
    
    var day1 = data.list[4];
    var day2 = data.list[12];
    var day3 = data.list[20];
    var day4 = data.list[28];
    var day5 = data.list[36];

    showForecast(day1, day2, day3, day4, day5);


})
}

function getWeather(city, lat, lon) {
  var requestUrl = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=imperial&lang=en&appid=aa3fbae0a4e68296f1ce493a844937a7";

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      
      var temp = data.main.temp;
      var wind = data.wind.speed;
      var humidity = data.main.humidity;
    
      var icon = data.weather[0].icon;
      var iconEl = document.getElementById('currentWeatherIcon');
      iconEl.setAttribute('src', 'http://openweathermap.org/img/w/' + icon + '.png');
      iconEl.setAttribute('class', 'icon');
      

      showCurrentWeather(city, temp, wind, humidity);

    
  
  })
}

function showCurrentWeather(city, temp, wind, humidity) {
  displayEl.setAttribute('class', 'display');
  presentEl.setAttribute('class', 'present');
  currentWeather.setAttribute('class', 'weatherList');
  showCityName.textContent = "Current weather in " + city + ":";
  var tempEl = document.getElementById('currentTemp');
  tempEl.textContent = "Tempature: " + temp + " degrees fahrenheit";

  var windEl = document.getElementById('currentWind');
  windEl.textContent = "Wind Speed: " + wind + "mph";

  var humidityEl = document.getElementById('currentHumid');
  humidityEl.textContent = "Humidity: " + humidity;


}

function showForecast(day1, day2, day3, day4, day5) {
  
  futureEl.setAttribute('class', 'future');
  var dayOne = document.getElementById('dayOne');
  var dayTwo = document.getElementById('dayTwo');
  var dayThree = document.getElementById('dayThree');
  var dayFour = document.getElementById('dayFour');
  var dayFive = document.getElementById('dayFive');

  var dayOneIcon = day1.weather[0].icon;
  var dayOneIconEl = document.getElementById('dayOneIcon');
  dayOneIconEl.setAttribute('src', 'http://openweathermap.org/img/w/' + dayOneIcon + '.png');
  dayOneIconEl.setAttribute('class', 'forecastIcon');

  var dayOneDate = document.getElementById('dayOneDate');
  var dayOneTemp = document.getElementById('dayOneTemp');
  var dayOneWind = document.getElementById('dayOneWind');
  var dayOneHumid = document.getElementById('dayOneHumid');

  dayOneDate.textContent = "date: " + formatDate(day1.dt_txt); 
  dayOneTemp.textContent = "temperature: " + day1.main.temp + " degrees fahrenheit";
  dayOneWind.textContent = "wind speed: " + day1.wind.speed + "mph";
  dayOneHumid.textContent = "humidity: " + day1.main.humidity;

  var dayTwoDate = document.getElementById('dayTwoDate');
  var dayTwoTemp = document.getElementById('dayTwoTemp');
  var dayTwoWind = document.getElementById('dayTwoWind');
  var dayTwoHumid = document.getElementById('dayTwoHumid');

  var dayTwoIcon = day2.weather[0].icon;
  var dayTwoIconEl = document.getElementById('dayTwoIcon');
  dayTwoIconEl.setAttribute('src', 'http://openweathermap.org/img/w/' + dayTwoIcon + '.png');
  dayTwoIconEl.setAttribute('class', 'forecastIcon');

  dayTwoDate.textContent = "date: " + formatDate(day2.dt_txt); 
  dayTwoTemp.textContent = "temperature: " + day2.main.temp + " degrees fahrenheit";
  dayTwoWind.textContent = "wind speed: " + day2.wind.speed + "mph";
  dayTwoHumid.textContent = "humidity: " + day2.main.humidity;

  var dayThreeDate = document.getElementById('dayThreeDate');
  var dayThreeTemp = document.getElementById('dayThreeTemp');
  var dayThreeWind = document.getElementById('dayThreeWind');
  var dayThreeHumid = document.getElementById('dayThreeHumid');

  var dayThreeIcon = day3.weather[0].icon;
  var dayThreeIconEl = document.getElementById('dayThreeIcon');
  dayThreeIconEl.setAttribute('src', 'http://openweathermap.org/img/w/' + dayThreeIcon + '.png');
  dayThreeIconEl.setAttribute('class', 'forecastIcon');

  dayThreeDate.textContent = "date: " + formatDate(day3.dt_txt); 
  dayThreeTemp.textContent = "temperature: " + day3.main.temp + " degrees fahrenheit";
  dayThreeWind.textContent = "wind speed: " + day3.wind.speed + "mph";
  dayThreeHumid.textContent = "humidity: " + day3.main.humidity;

  var dayFourDate = document.getElementById('dayFourDate');
  var dayFourTemp = document.getElementById('dayFourTemp');
  var dayFourWind = document.getElementById('dayFourWind');
  var dayFourHumid = document.getElementById('dayFourHumid');

  var dayFourIcon = day4.weather[0].icon;
  var dayFourIconEl = document.getElementById('dayFourIcon');
  dayFourIconEl.setAttribute('src', 'http://openweathermap.org/img/w/' + dayFourIcon + '.png');
  dayFourIconEl.setAttribute('class', 'forecastIcon');

  dayFourDate.textContent = "date: " + formatDate(day4.dt_txt); 
  dayFourTemp.textContent = "temperature: " + day4.main.temp + " degrees fahrenheit";
  dayFourWind.textContent = "wind speed: " + day4.wind.speed + "mph";
  dayFourHumid.textContent = "humidity: " + day4.main.humidity;

  var dayFiveDate = document.getElementById('dayFiveDate');
  var dayFiveTemp = document.getElementById('dayFiveTemp');
  var dayFiveWind = document.getElementById('dayFiveWind');
  var dayFiveHumid = document.getElementById('dayFiveHumid');

  var dayFiveIcon = day5.weather[0].icon;
  var dayFiveIconEl = document.getElementById('dayFiveIcon');
  dayFiveIconEl.setAttribute('src', 'http://openweathermap.org/img/w/' + dayFiveIcon + '.png');
  dayFiveIconEl.setAttribute('class', 'forecastIcon');

  dayFiveDate.textContent = "date: " + formatDate(day5.dt_txt); 
  dayFiveTemp.textContent = "temperature: " + day5.main.temp + " degrees fahrenheit";
  dayFiveWind.textContent = "wind speed: " + day5.wind.speed + "mph";
  dayFiveHumid.textContent = "humidity: " + day5.main.humidity;


  
}

function formatDate(date) {
  date = date.split(' ');
  date.pop();
  date = date.toString();
  return date;

}

function saveLocation(location) {
  var savedLocations = JSON.parse(localStorage.getItem('locations')) || [];
  savedLocations.push(location);
  localStorage.setItem('locations', JSON.stringify(savedLocations));
  var savedList = document.getElementById('savedList');
  var listEl = savedList.appendChild(document.createElement('li'));
  listEl.setAttribute('class' ,'savedListEl');
  listEl.textContent = location;
  listEl.addEventListener('click', searchSaved);

}

function showSaved() {
  var savedLocations = JSON.parse(localStorage.getItem('locations')) || [];
  var savedList = document.getElementById('savedList');
  for (var i = 0; i < savedLocations.length; i++) {
    var listEl = savedList.appendChild(document.createElement('li'));
    listEl.setAttribute('class' ,'savedListEl');
    listEl.textContent = savedLocations[i];
    listEl.addEventListener('click', searchSaved);
  }
}

function searchSaved(event) {
  var check = event.target;
  geoData(check.textContent);

}

function clearLocalStorage() {
  var list = document.getElementById('savedList');
  list.innerHTML = '';
  var empty = [];
  var savedLocations = JSON.parse(localStorage.getItem('locations')) || [];
  localStorage.setItem('locations', JSON.stringify(empty));
  

}
