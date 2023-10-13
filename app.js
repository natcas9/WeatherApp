function submitCity(event) {
  //change temperature with input
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let city = document.querySelector("#title");
  city.innerHTML = searchInput.value;

  searchCity(searchInput.value);
  searchInput.value = "";
}

function searchCity(city) {
  let apiKey = "2980ff43226d67e53abfcdb6d457dcc8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  console.log(apiUrl);
  console.log(apiKey);
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

searchCity("London");

function showTemperature(response) {
  console.log(response.data);
  let h1 = document.querySelector("#title");
  h1.innerHTML = response.data.name;
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
  getForecast(response.data.coord);
}

//select input
let form = document.querySelector("#search-form");
//button event
form.addEventListener("submit", submitCity);

function changeTempOne(event) {
  //change from F-C
  event.preventDefault();
  conversionCEL.classList.add("conv");
  conversionFAR.classList.remove("conv");
  let change = document.querySelector("#temperature-num");
  change.innerHTML = Math.round(celsiustemperature);
}

function changeTempTwo(event) {
  //change from C-F
  event.preventDefault();
  conversionFAR.classList.add("conv");
  conversionCEL.classList.remove("conv");
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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

let month = months[now.getMonth()];

completeDate.innerHTML = `${month} ${date}, ${year}`;

navigator.geolocation.getCurrentPosition(retrievePosition);

function currentTemp() {
  //get coordinates
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

function retrievePosition(position) {
  console.log(position);
  let apiKey = "2980ff43226d67e53abfcdb6d457dcc8";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showTemperature);
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    //appending a new column
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-2">
      <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
     
      <img
        src="http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png"
        alt=""
        width="42"
      />
      <div class="weather-forecast-temperatures">
        <span class="weather-forecast-temperature-max"> ${Math.round(
          forecastDay.temp.max
        )}° </span>
        <span class="weather-forecast-temperature-min"> ${Math.round(
          forecastDay.temp.min
        )}° </span>
        </div>
      </div>

  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "2980ff43226d67e53abfcdb6d457dcc8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

let formcurrent = document.querySelector(".current");

formcurrent.addEventListener("click", currentTemp);

function cityTemp() {
  let city = document.querySelector("#title");
  city.innerHTML = "London";
  let apiKey = "2980ff43226d67e53abfcdb6d457dcc8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

let cityLondon = document.querySelector(".lon");

cityLondon.addEventListener("click", cityTemp);

function cityTempny() {
  let city = document.querySelector("#title");
  city.innerHTML = "New York";
  let name = "New York";
  let apiKey = "2980ff43226d67e53abfcdb6d457dcc8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

let cityNewYork = document.querySelector(".ny");

cityNewYork.addEventListener("click", cityTempny);

function cityTempmad() {
  let city = document.querySelector("#title");
  city.innerHTML = "Madrid";
  let apiKey = "2980ff43226d67e53abfcdb6d457dcc8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Madrid&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

let cityMadrid = document.querySelector(".mad");

cityMadrid.addEventListener("click", cityTempmad);

function cityTempmex() {
  let city = document.querySelector("#title");
  city.innerHTML = "Mexico City";
  let name = "Mexico City";
  let apiKey = "2980ff43226d67e53abfcdb6d457dcc8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

let cityMex = document.querySelector(".mex");

cityMex.addEventListener("click", cityTempmex);
