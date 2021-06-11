
var sButton = document.querySelector('#searchButton');
var listOfCities = document.querySelector('#cityList');
var usrInput = document.querySelector('#userInput');

var localCities = window.localStorage.getItem('localCities');
let rSearch = [];
if (localCities !== null) {
  rSearch = JSON.parse(window.localStorage.getItem('localCities'));
}

console.log("localCities" ,localCities);
  function formSubmitHandler(city, addCitytoArray) {

  fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=2a0ccef3d39a4025d5525f79d575070e`, {
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
      var wSpeed = data.wind.speed;
      var humidity = data.main.humidity;
      var temperature = data.main.temp;
      var faren = ((temperature-273.15) * (9/5)) + 32
      let fTemp = faren.toFixed(2);
      let uvIndex = data2.current.uvi;
      var iconID = data.weather[0].icon;
      var icon = `http://openweathermap.org/img/wn/${iconID}@2x.png`;
      
      if (addCitytoArray) {
        rSearch.unshift(city);
      if (rSearch.length > 10) {
        rSearch.pop();
      }
      window.localStorage.setItem('localCities', JSON.stringify(rSearch));
      }
      
      for (i=0; i<rSearch.length; i++) {
        document.getElementById('cityList' + i).textContent = rSearch[i];
      }
      
      document.getElementById('temperature').textContent = "Temperature: " + fTemp;
      document.getElementById('Humidity').textContent = "Humidity: " + humidity;
      document.getElementById('windSpeed').textContent = "Wind Speed: " + wSpeed;
      document.getElementById('uvIndex').textContent = "UV Index: " + uvIndex;
      document.getElementById('todayIcon').src = icon;
      document.getElementById('cName').textContent = "City: " + city;
      

    })
  });

}

var fiveDay = function(city) { 
  
  fetch(`https://api.openweathermap.org/data/2.5/forecast/?q=${city}&cnt=5&appid=2a0ccef3d39a4025d5525f79d575070e`, {

    })
    .then(function(response) {
      return response.json();
    })
    .then(function (data2) {
      console.log("fiveDay" , data2);
      for (i=0; i < 5; i++) {
        var currentTemp = data2.list[i].main.temp;
        var faren = ((currentTemp-273.15) * (9/5)) + 32
        let fTemp = faren.toFixed(2);
        var humidity = data2.list[i].main.humidity;
        var iconID = data2.list[i].weather[0].icon;
        var icon = `http://openweathermap.org/img/wn/${iconID}@2x.png`;
        document.getElementById('temp' + i).textContent = "Temp: " + fTemp;
        document.getElementById('humidity' + i).textContent = "Humidity: " + humidity;
        document.getElementById('icon' + i).src = icon;
      }
    })
}

  var onButtonClick = function(event) {
    
    console.log(document.getElementById('userInput').value);
    formSubmitHandler(document.getElementById('userInput').value, true);
    fiveDay(document.getElementById('userInput').value);
    // recentSearches(document.getElementById('recentSearch').value);
    
  }
      sButton.addEventListener("click", onButtonClick);
      // Execute a function when the user releases a key on the keyboard
      usrInput.addEventListener("keyup", function(event) {
      // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
        // Cancel the default action, if needed
          event.preventDefault();
        // Trigger the button element with a click
        onButtonClick();
        
      }
    });

onPageLoad = function() {
  var date = new Date();
  d = date.getDate(),
  m = date.getMonth(),
  y = date.getFullYear();
  var tDate = m+'/'+d+'/'+y;
  
  for (i=1; i < 6; i++) {
    var curDate = new Date(y, m, d+i)
    var formatDate = curDate.getMonth() +'/'+curDate.getDate()+'/'+ curDate.getFullYear();
    document.getElementById('date' + i).textContent = formatDate;
    console.log(formatDate);
  }

  for (i=0; i<rSearch.length; i++) {
    document.getElementById('cityList' + i).textContent = rSearch[i];
  }

  if (rSearch.length > 0) {
    formSubmitHandler(rSearch[0], false);
    fiveDay(rSearch[0]);
  }
  else {
    alert('Please make a search');
  }
  
}

onPageLoad();