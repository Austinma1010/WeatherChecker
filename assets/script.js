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
// above code grabs HTML elements that will be used in The JS code

// adds eventListener to the 'clear Locations' button
clearBtn.addEventListener('click', clearLocalStorage);
// adds eventListener to the 'Search!' button
search.addEventListener('click', function() {
  if (cityName.value == 0) {
    return;
  } else {
  geoData(cityName.value); 
  saveLocation(cityName.value);
}
});
// adds eventListener to the 'Save Location' button


showSaved(); // updates the saved Locations list when page starts


function geoData(city) { // converts searched city name to lat and lon coordinates
  
  
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



function getForecast(lat, lon) { // retrieves the forecast weather data from API
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

function getWeather(city, lat, lon) { // retrieves current weather data from API
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

function showCurrentWeather(city, temp, wind, humidity) { // displays retrieved current weather data to page
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

function showForecast(day1, day2, day3, day4, day5) { // displays retrieved forecast weather data to page
  
  futureEl.setAttribute('class', 'future');
  var title = document.getElementById('fiveDayForecast');
  title.textContent = 'Five Day Forecast:';
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
  dayOneDate.setAttribute('class', 'dateEl');
  var dayOneTemp = document.getElementById('dayOneTemp');
  dayOneTemp.setAttribute('class', 'forecastListEl');
  var dayOneWind = document.getElementById('dayOneWind');
  dayOneWind.setAttribute('class', 'forecastListEl');
  var dayOneHumid = document.getElementById('dayOneHumid');
  dayOneHumid.setAttribute('class', 'forecastListEl');

  dayOneDate.textContent = formatDate(day1.dt_txt); 
  dayOneTemp.textContent = "temperature: " + day1.main.temp + " degrees fahrenheit";
  dayOneWind.textContent = "wind speed: " + day1.wind.speed + "mph";
  dayOneHumid.textContent = "humidity: " + day1.main.humidity;

  var dayTwoDate = document.getElementById('dayTwoDate');
  dayTwoDate.setAttribute('class', 'dateEl');
  var dayTwoTemp = document.getElementById('dayTwoTemp');
  dayTwoTemp.setAttribute('class', 'forecastListEl');
  var dayTwoWind = document.getElementById('dayTwoWind');
  dayTwoWind.setAttribute('class', 'forecastListEl');
  var dayTwoHumid = document.getElementById('dayTwoHumid');
  dayTwoHumid.setAttribute('class', 'forecastListEl');

  var dayTwoIcon = day2.weather[0].icon;
  var dayTwoIconEl = document.getElementById('dayTwoIcon');
  dayTwoIconEl.setAttribute('src', 'http://openweathermap.org/img/w/' + dayTwoIcon + '.png');
  dayTwoIconEl.setAttribute('class', 'forecastIcon');

  dayTwoDate.textContent = formatDate(day2.dt_txt); 
  dayTwoTemp.textContent = "temperature: " + day2.main.temp + " degrees fahrenheit";
  dayTwoWind.textContent = "wind speed: " + day2.wind.speed + "mph";
  dayTwoHumid.textContent = "humidity: " + day2.main.humidity;

  var dayThreeDate = document.getElementById('dayThreeDate');
  dayThreeDate.setAttribute('class', 'dateEl');
  var dayThreeTemp = document.getElementById('dayThreeTemp');
  dayThreeTemp.setAttribute('class', 'forecastListEl');
  var dayThreeWind = document.getElementById('dayThreeWind');
  dayThreeWind.setAttribute('class', 'forecastListEl');
  var dayThreeHumid = document.getElementById('dayThreeHumid');
  dayThreeHumid.setAttribute('class', 'forecastListEl');

  var dayThreeIcon = day3.weather[0].icon;
  var dayThreeIconEl = document.getElementById('dayThreeIcon');
  dayThreeIconEl.setAttribute('src', 'http://openweathermap.org/img/w/' + dayThreeIcon + '.png');
  dayThreeIconEl.setAttribute('class', 'forecastIcon');

  dayThreeDate.textContent = formatDate(day3.dt_txt); 
  dayThreeTemp.textContent = "temperature: " + day3.main.temp + " degrees fahrenheit";
  dayThreeWind.textContent = "wind speed: " + day3.wind.speed + "mph";
  dayThreeHumid.textContent = "humidity: " + day3.main.humidity;

  var dayFourDate = document.getElementById('dayFourDate');
  dayFourDate.setAttribute('class', 'dateEl');
  var dayFourTemp = document.getElementById('dayFourTemp');
  dayFourTemp.setAttribute('class', 'forecastListEl');
  var dayFourWind = document.getElementById('dayFourWind');
  dayFourWind.setAttribute('class', 'forecastListEl');
  var dayFourHumid = document.getElementById('dayFourHumid');
  dayFourHumid.setAttribute('class', 'forecastListEl');

  var dayFourIcon = day4.weather[0].icon;
  var dayFourIconEl = document.getElementById('dayFourIcon');
  dayFourIconEl.setAttribute('src', 'http://openweathermap.org/img/w/' + dayFourIcon + '.png');
  dayFourIconEl.setAttribute('class', 'forecastIcon');

  dayFourDate.textContent = formatDate(day4.dt_txt); 
  dayFourTemp.textContent = "temperature: " + day4.main.temp + " degrees fahrenheit";
  dayFourWind.textContent = "wind speed: " + day4.wind.speed + "mph";
  dayFourHumid.textContent = "humidity: " + day4.main.humidity;

  var dayFiveDate = document.getElementById('dayFiveDate');
  dayFiveDate.setAttribute('class', 'dateEl');
  var dayFiveTemp = document.getElementById('dayFiveTemp');
  dayFiveTemp.setAttribute('class', 'forecastListEl');
  var dayFiveWind = document.getElementById('dayFiveWind');
  dayFiveWind.setAttribute('class', 'forecastListEl');
  var dayFiveHumid = document.getElementById('dayFiveHumid');
  dayFiveHumid.setAttribute('class', 'forecastListEl');

  var dayFiveIcon = day5.weather[0].icon;
  var dayFiveIconEl = document.getElementById('dayFiveIcon');
  dayFiveIconEl.setAttribute('src', 'http://openweathermap.org/img/w/' + dayFiveIcon + '.png');
  dayFiveIconEl.setAttribute('class', 'forecastIcon');

  dayFiveDate.textContent = formatDate(day5.dt_txt); 
  dayFiveTemp.textContent = "temperature: " + day5.main.temp + " degrees fahrenheit";
  dayFiveWind.textContent = "wind speed: " + day5.wind.speed + "mph";
  dayFiveHumid.textContent = "humidity: " + day5.main.humidity;
  


  
}

function formatDate(date) { // formats retrieved date data
  date = date.split(' ');
  date.pop();
  date = date.toString();
  return date;

}

function saveLocation(location) { // saves a selected location to local storage
  var savedLocations = JSON.parse(localStorage.getItem('locations')) || [];
  savedLocations.push(location);
  localStorage.setItem('locations', JSON.stringify(savedLocations));
  var savedList = document.getElementById('savedList');
  var listEl = savedList.appendChild(document.createElement('li'));
  listEl.setAttribute('class' ,'savedListEl');
  listEl.textContent = location;
  listEl.addEventListener('click', searchSaved);

}

function showSaved() { // displays saved locations on page
  var savedLocations = JSON.parse(localStorage.getItem('locations')) || [];
  var savedList = document.getElementById('savedList');
  for (var i = 0; i < savedLocations.length; i++) {
    var listEl = savedList.appendChild(document.createElement('li'));
    listEl.setAttribute('class' ,'savedListEl');
    listEl.textContent = savedLocations[i];
    listEl.addEventListener('click', searchSaved);
  }
}

function searchSaved(event) { // lets user click on saved locations
  var check = event.target;
  geoData(check.textContent);

}

function clearLocalStorage() { // Lets user clear local storage
  var list = document.getElementById('savedList');
  list.innerHTML = '';
  var empty = [];
  var savedLocations = JSON.parse(localStorage.getItem('locations')) || [];
  localStorage.setItem('locations', JSON.stringify(empty));
  

}
