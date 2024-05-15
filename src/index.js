// Update Data from API
function refreshWeather(response) {
  // Temperature
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  // City
  let cityElement = document.querySelector("#city");
  // Weather Condition
  let descriptionElement = document.querySelector("#description");
  // Humidity
  let humidityElement = document.querySelector("#humidity");
  // Wind
  let windElement = document.querySelector("#wind");
  // Time
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  // Icon
  let iconElement = document.querySelector("#icon");

  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;
  temperatureElement.innerHTML = Math.round(temperature);
}

// Format Date
function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  return `${day} ${hours}:${minutes}`;
}

// make api call the interface
function searchCity(city) {
  let apiKey = "f5371a45b3fc047t75a40051bo80cbe3";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

// Default search
searchCity("Paris");
