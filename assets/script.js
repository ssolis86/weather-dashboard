
var sButton = document.querySelector('#searchButton');
var listOfCities = document.querySelector('#cityList');
var usrInput = document.querySelector('#userInput');
var recentSearches = [];

var formSubmitHandler = function() {

  fetch("http://api.openweathermap.org/data/2.5/weather?q=San Antonio,us&APPID=2a0ccef3d39a4025d5525f79d575070e", {
    cache: 'reload',
    
})
.then(function (response) {
    return response.json();
  })
  .then(function (data) {
    lat = (data.coord.lat);
    lon = (data.coord.lon);
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=2a0ccef3d39a4025d5525f79d575070e`, {

    })
    .then(function(response) {
      return response.json();
    })
    .then(function (data2) {
      console.log('current_weather', data.main.temp);
      var wSpeed = data.wind.speed;
      var humidity = data.main.humidity;
      var temperature = data.main.temp;
      var faren = ((temperature-273.15) * (9/5)) + 32
      let fTemp = faren.toFixed(2);
      let uvIndex = data2.current.uvi;
      console.log("fTemp" + fTemp, "humidity" + humidity, "wind speed" + wSpeed, "UV index" + uvIndex );
      
      document.getElementById('temperature').textContent = "Temperature: " + temperature;
      document.getElementById('Humidity').textContent = "Humidity: " + humidity;
      document.getElementById('windSpeed').textContent = "Wind Speed: " + wSpeed;
      document.getElementById('uvIndex').textContent = "UV Index: " + uvIndex;
    })

    
    
  });

}
    
// I am presented with the 
// city name, 
// the date, 
// an icon representation of 
// weather conditions, 
// the temperature, done
// the humidity, done
// the wind speed, 
// and the UV index

var renderCitiesSearched = function() {
  listOfCities.innerHTML = "";

  for (var i = 0; i < JSON.parse(localStorage.getItem("recentSearches")).length; i++) {
    var cities = JSON.parse(localStorage.getItem("recentSearches"))[i];

    var li = document.createElement('li');
    li.textContent = cities;
    li.setAttribute('data-index', i);
    console.log(cities);
    listOfCities.appendChild(li);
  }

}

  sButton.addEventListener("click", formSubmitHandler);

  // Execute a function when the user releases a key on the keyboard
  usrInput.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
    // Cancel the default action, if needed
      event.preventDefault();
    // Trigger the button element with a click
    formSubmitHandler();
    
  }
});

