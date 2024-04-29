const weatherRegion = document.querySelector(".weather__region");
const weatherImage = document.querySelector(".weather__image");
const weatherDegree = document.querySelector(".weather__degree");
const weatherDesc = document.querySelector(".weather__desc");
const forecastDay = document.querySelector(".forecastday");
const weatherTomorrow = document.querySelector(".weather__tomorrow");
const weatherAfterTomorrow = document.querySelector(".weather__after-tomorrow");
const weatherTomorrowImage = document.querySelector(
  ".weather__tomorrow__image"
);
const weatherTomorrowDegree = document.querySelector(
  ".weather__tomorrow__degree"
);
const tomorrowSunrise = document.querySelector(".tomorrow__sunrise");
const tomorrowSunset = document.querySelector(".tomorrow__sunset");
const weatherTomorrowDecs = document.querySelector(".weather__tomorrow__decs");
const afterWeatherData = document.querySelector(".after-weather__data");
const weatherAfterTomorrowImage = document.querySelector(
  ".weather__after-tomorrow__image"
);
const weatherAfterTomorrowDegree = document.querySelector(
  ".weather__after-tomorrow__degree"
);
const weatherAfterTomorrowDecs = document.querySelector(
  ".weather__after-tomorrow__decs"
);

const afterTomorrowSunrise = document.querySelector(".after-tomorrow__sunrise");
const afterTomorrowSunset = document.querySelector(".after-tomorrow__sunset");
const searchForm = document.querySelector(".form");
const searchInput = document.querySelector(".search__input");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  //   console.log(searchInput.value);
  fetchWeatherData(searchInput.value);
});

document.addEventListener("DOMContentLoaded", () => {
  fetchWeatherData();
});

async function fetchWeatherData(region = "Tashkent") {
  let response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=644f6ce0ca9e401ebb891832211707&q=${region}&days=7&aqi=yes&alerts=yes`
  );

  await response
    .json()
    .then((res) => {
      if (res.error) {
        throw new Error("Bunday shahar mavjud emas");
      }
      renderWeather(res);
    })
    .catch((err) => alert(err));
}

function renderWeather(data) {
  console.log(data);

  weatherRegion.innerHTML = `${data.location.name}, ${data.location.country}`;
  weatherDegree.textContent = `${data.current.temp_c}°C`;
  weatherImage.src = data.current.condition.icon;
  weatherDesc.textContent = data.current.condition.text;

  //  Tomorrow
  weatherTomorrowImage.src = data.forecast.forecastday[1].day.condition.icon;
  weatherTomorrowDegree.innerHTML = ` ${data.forecast.forecastday[1].day.avgtemp_c}°C`;
  tomorrowSunrise.innerHTML = `Sunrise: ${data.forecast.forecastday[1].astro.sunrise}`;
  tomorrowSunset.innerHTML = `Sunset: ${data.forecast.forecastday[1].astro.sunset}`;
  weatherTomorrowDecs.textContent =
    data.forecast.forecastday[1].day.condition.text;
  afterWeatherData.textContent = data.forecast.forecastday[2].date.slice(5);
  //  After Tomorrow
  weatherAfterTomorrowImage.src =
    data.forecast.forecastday[2].day.condition.icon;
  weatherAfterTomorrowDegree.innerHTML = `${data.forecast.forecastday[2].day.avgtemp_c}°C`;
  weatherAfterTomorrowDecs.innerHTML =
    data.forecast.forecastday[2].day.condition.text;
  afterTomorrowSunrise.innerHTML = `Sunrise: ${data.forecast.forecastday[2].astro.sunrise}`;
  afterTomorrowSunset.innerHTML = `Sunset: ${data.forecast.forecastday[2].astro.sunset}`;
  let forecastdayItems = "";
  let date = new Date();
  let hour = date.getHours();
  console.log(hour);

  console.log(data.forecast.forecastday[0].hour);

  data.forecast.forecastday[0].hour.slice(hour + 1).forEach((el) => {
    forecastdayItems += `
          <div class= "forecastday__item">
           <p>${el.time.split(" ")[1]}</p>
            <img src="${el.condition.icon}" alt="img">
            <p>${el.temp_c}°C</p>
          </div>
      `;
  });

  forecastDay.innerHTML = forecastdayItems;
}
