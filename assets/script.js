
var sButton = document.querySelector('#searchButton');
var listOfCities = document.querySelector('#cityList');
var recentSearches = [];

var formSubmitHandler = function(event) {
    event.preventDefault;
    var cityName = document.getElementById('userInput').value;
    document.getElementById("cName").textContent = "City: " + cityName;
    inputValue = cityName.trim();
    
    if (localStorage.getItem('recentSearches') === null) {
      
      recentSearches.push(inputValue);
      localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
  
    } else {
      
      recentSearches = JSON.parse(localStorage.getItem("recentSearches"));
      recentSearches.push(inputValue);
      localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
      
    }
    
    renderCitiesSearched(localStorage.getItem('recentSearches'));
    
  }
  
var renderCitiesSearched = function() {
  
  for (var i = 0; i < localStorage.getItem('recentSearches').length; i++) {
    var cities = localStorage.getItem('recentSearches')[i];

    var li = document.createElement('li');
    li.textContent = cities;
    console.log(cities);
    listOfCities.appendChild(li);
  }
}



fetch("http://api.openweathermap.org/data/2.5/weather?q=San Antonio,us&APPID=2a0ccef3d39a4025d5525f79d575070e", {
    cache: 'reload',
})
.then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log('current_weather', data);
    var tempurature = "temp";
    var humidity = 'humidity';

  });

  fetch("http://api.openweathermap.org/data/2.5/forecast?q=San Antonio&appid=2a0ccef3d39a4025d5525f79d575070e", {
    cache: 'reload',
})
.then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log('forecast',data);
    var tempurature = "temp";
    var humidity = 'humidity';

  });

  sButton.addEventListener("click", formSubmitHandler);


