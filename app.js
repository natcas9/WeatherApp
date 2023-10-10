function submitCity(event) {
  //change temperature with input
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let city = document.querySelector("#title");
  city.innerHTML = searchInput.value;
  let apiKey = "a867e25f2d83db579421a57fd8e937ec";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=metric`;
  console.log(apiUrl);
  console.log(apiKey);
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
  searchInput.value = "";
}

function showTemperature(response) {
  console.log(response.data);
  let temp = Math.round(response.data.main.temp);
  let temperature = document.querySelector("#temperature-num");
  temperature.innerHTML = temp;
  let humidity = Math.round(response.data.main.humidity);
  let hum = document.querySelector(".humidity");
  hum.innerHTML = humidity;
  let wind = Math.round(response.data.wind.speed);
  let win = document.querySelector(".wind");
  win.innerHTML = wind;
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  let description = document.querySelector("#weatherdesc");
  description.innerHTML = response.data.weather[0].description;
  celsiustemperature = response.data.main.temp;
}

//select input
let form = document.querySelector("#search-form");
//button event
form.addEventListener("submit", submitCity);

function changeTempOne(event) {
  //change from F-C
  event.preventDefault();
  let change = document.querySelector("#temperature-num");
  change.innerHTML = Math.round(celsiustemperature);
}

function changeTempTwo(event) {
  //change from C-F
  event.preventDefault();
  let change = document.querySelector("#temperature-num");
  let conversion = Math.round((celsiustemperature * 9) / 5 + 32);
  change.innerHTML = conversion;
}

//variables change temperatures
let conversionCEL = document.querySelector("#temperature-cel");

conversionCEL.addEventListener("click", changeTempOne);

let conversionFAR = document.querySelector("#temperature-far");

conversionFAR.addEventListener("click", changeTempTwo);

let celsiustemperature = null;

//Date
let completeDate = document.querySelector(".date");

let now = new Date();
let year = now.getFullYear();
let date = now.getDate(); //1, 2, 3

let months = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

let month = months[now.getMonth()];

completeDate.innerHTML = `${month} ${date}, ${year}`;

navigator.geolocation.getCurrentPosition(retrievePosition);

function currentTemp() {
  //get coordinates
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

function retrievePosition(position) {
  console.log(position);
  let apiKey = "a867e25f2d83db579421a57fd8e937ec";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

function showWeather(response) {
  let h1 = document.querySelector("#title");
  let temperature = Math.round(response.data.main.temp);
  console.log(response.data.main.temp);
  console.log(response.data);
  h1.innerHTML = response.data.name;
  let weather = document.querySelector("#temperature-num");
  weather.innerHTML = temperature;
  let humidity = Math.round(response.data.main.humidity);
  let hum = document.querySelector(".humidity");
  hum.innerHTML = humidity;
  let wind = Math.round(response.data.wind.speed);
  let win = document.querySelector(".wind");
  win.innerHTML = wind;
  let description = document.querySelector("#weatherdesc");
  description.innerHTML = response.data.weather[0].description;
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  celsiustemperature = response.data.main.temp;
}

let formcurrent = document.querySelector(".current");

formcurrent.addEventListener("click", currentTemp);

function cityTemp() {
  let city = document.querySelector("#title");
  city.innerHTML = "London";
  let apiKey = "a867e25f2d83db579421a57fd8e937ec";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

let cityLondon = document.querySelector(".lon");

cityLondon.addEventListener("click", cityTemp);

function cityTempny() {
  let city = document.querySelector("#title");
  city.innerHTML = "New York";
  let name = "New York";
  let apiKey = "a867e25f2d83db579421a57fd8e937ec";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

let cityNewYork = document.querySelector(".ny");

cityNewYork.addEventListener("click", cityTempny);

function cityTempmad() {
  let city = document.querySelector("#title");
  city.innerHTML = "Madrid";
  let apiKey = "a867e25f2d83db579421a57fd8e937ec";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Madrid&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

let cityMadrid = document.querySelector(".mad");

cityMadrid.addEventListener("click", cityTempmad);

function cityTempmex() {
  let city = document.querySelector("#title");
  city.innerHTML = "Mexico City";
  let name = "Mexico City";
  let apiKey = "a867e25f2d83db579421a57fd8e937ec";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

let cityMex = document.querySelector(".mex");

cityMex.addEventListener("click", cityTempmex);
