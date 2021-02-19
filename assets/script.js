
var sButton = document.querySelector('#searchButton');

var formSubmitHandler = function(event) {
  event.preventDefault;
    var cityName = document.getElementById('userInput').value;
    document.getElementById("cName").textContent = "City: " + cityName;
    inputValue = cityName.trim();
    
    // getPetAPI(inputValue);
		localStorage.setItem("city", inputValue);
		var recentEntry = localStorage.getItem("city");
		document.getElementById("cityOne").textContent = recentEntry;
    
  }



fetch("http://api.openweathermap.org/data/2.5/weather?q=San Antonio,us&APPID=2a0ccef3d39a4025d5525f79d575070e", {
    cache: 'reload',
})
.then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    var tempurature = "temp";
    var humidity = 'humidity';

  });

  sButton.addEventListener("click", formSubmitHandler);


