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
   
    console.log(data);
    var day1 = data.list[4];
    var day2 = data.list[12];
    var day3 = data.list[20];
    var day4 = data.list[28];
    var day5 = data.list[36];

    showForecast(day1, day2, day3, day4, day5);


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
  var tempEl = currentWeather.appendChild(document.createElement('li'));
  tempEl.textContent = "Tempature: " + temp + " degrees fahrenheit";

  var windEl = currentWeather.appendChild(document.createElement('li'));
  windEl.textContent = "Wind Speed: " + wind + "mph";

  var humidityEl = currentWeather.appendChild(document.createElement('li'));
  humidityEl.textContent = "Humidity: " + humidity;


}

function showForecast(day1, day2, day3, day4, day5) {
  futureEl.setAttribute('class', 'future');
  var dayOne = document.getElementById('dayOne');
  var dayTwo = document.getElementById('dayTwo');
  var dayThree = document.getElementById('dayThree');
  var dayFour = document.getElementById('dayFour');
  var dayFive = document.getElementById('dayFive');
  var dayOneDate = dayOne.appendChild(document.createElement('li'));
  var dayOneTemp = dayOne.appendChild(document.createElement('li'));
  var dayOneWind = dayOne.appendChild(document.createElement('li'));
  var dayOneHumid = dayOne.appendChild(document.createElement('li'));
  dayOneDate.textContent = "date: " + formatDate(day1.dt_txt); 
  dayOneTemp.textContent = "temperature: " + day1.main.temp + " degrees fahrenheit";
  dayOneWind.textContent = "wind speed: " + day1.wind.speed + "mph";
  dayOneHumid.textContent = "humidity: " + day1.main.humidity;

  var dayTwoDate = dayTwo.appendChild(document.createElement('li'));
  var dayTwoTemp = dayTwo.appendChild(document.createElement('li'));
  var dayTwoWind = dayTwo.appendChild(document.createElement('li'));
  var dayTwoHumid = dayTwo.appendChild(document.createElement('li'));
  dayTwoDate.textContent = "date: " + formatDate(day2.dt_txt); 
  dayTwoTemp.textContent = "temperature: " + day2.main.temp + " degrees fahrenheit";
  dayTwoWind.textContent = "wind speed: " + day2.wind.speed + "mph";
  dayTwoHumid.textContent = "humidity: " + day2.main.humidity;

  var dayThreeDate = dayThree.appendChild(document.createElement('li'));
  var dayThreeTemp = dayThree.appendChild(document.createElement('li'));
  var dayThreeWind = dayThree.appendChild(document.createElement('li'));
  var dayThreeHumid = dayThree.appendChild(document.createElement('li'));
  dayThreeDate.textContent = "date: " + formatDate(day3.dt_txt); 
  dayThreeTemp.textContent = "temperature: " + day3.main.temp + " degrees fahrenheit";
  dayThreeWind.textContent = "wind speed: " + day3.wind.speed + "mph";
  dayThreeHumid.textContent = "humidity: " + day3.main.humidity;

  var dayFourDate = dayFour.appendChild(document.createElement('li'));
  var dayFourTemp = dayFour.appendChild(document.createElement('li'));
  var dayFourWind = dayFour.appendChild(document.createElement('li'));
  var dayFourHumid = dayFour.appendChild(document.createElement('li'));
  dayFourDate.textContent = "date: " + formatDate(day4.dt_txt); 
  dayFourTemp.textContent = "temperature: " + day4.main.temp + " degrees fahrenheit";
  dayFourWind.textContent = "wind speed: " + day4.wind.speed + "mph";
  dayFourHumid.textContent = "humidity: " + day4.main.humidity;

  var dayFiveDate = dayFive.appendChild(document.createElement('li'));
  var dayFiveTemp = dayFive.appendChild(document.createElement('li'));
  var dayFiveWind = dayFive.appendChild(document.createElement('li'));
  var dayFiveHumid = dayFive.appendChild(document.createElement('li'));
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