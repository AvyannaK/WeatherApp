// document.querySelector("form").addEventListener("submit", function (event) {
//     event.preventDefault();
//     getWeather();
//   });
  
//   function getWeather() {
//     var location = document.querySelector("input[name='cityName']").value;
  
//     fetch("/", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//       body: `cityName=${location}`,  
//     })
//       .then(function (response) {
//         return response.text();
//       })
//       .then(function (data) {
//         document.getElementById("weatherInfo").innerHTML = data;
//       })
//       .catch(function (error) {
//         console.log("Error retrieving weather data:", error);
//       });
//   }
  