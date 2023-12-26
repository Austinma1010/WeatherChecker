

function geoData() {
    var requestUrl = "http://api.openweathermap.org/geo/1.0/direct?q=richmond,va,us&limit=1&appid=5b96ab0189348a63ef62caf75d4120ff";

fetch(requestUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    var latitude = data[0].lat;
    var longitude = data[0].lon;
    // var longitude = data[0].lon.toString().substring(0, 5); 
    console.log(latitude);
    getWeather(latitude, longitude);

})

}

geoData();

function getWeather(lat, lon) {
    var requestUrl = "api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=38dc2afa8fc155aa61f50d8f0ed30fa9";

fetch(requestUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);

})
}