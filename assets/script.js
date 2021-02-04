fetch("http://api.openweathermap.org/data/2.5/weather?q=San Antonio,us&APPID=2a0ccef3d39a4025d5525f79d575070e", {
    cache: 'reload',
})
.then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });


