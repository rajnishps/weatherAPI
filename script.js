const demoDiv = document.querySelector(".demo");
const placeInput = document.querySelector(".placeInput");
const searchBtn = document.querySelector(".searchBtn");

const apiKey = `${{ secrets.API }}`;
let place = null;

placeInput.addEventListener("keyup", (event) => {
  event.preventDefault();
  if (event.keyCode === 13) {
    searchBtn.click();
  }
});

searchBtn.onclick = () => {
  place = placeInput.value;
  longlat(place);
};

const longlat = async (place) => {
  const baseURL = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${place}&limit=1&appid=${apiKey}`
  );
  const data = await baseURL.json();
  weather(data[0].lat, data[0].lon);
};

const weather = async (lat, lon) => {
  const baseURL = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=en&appid=${apiKey}&units=metric`
  );
  const data = await baseURL.json();
  current(data);
};

const current = (data) => {
  console.log(data);
  const name = `<h2>${data.name}, ${place}, ${data.sys.country}</h2>`;
  const currWeather = `<h2>${data.weather[0].main}</h2>`;
  const humidity = `<h2>Humidity: ${data.main.humidity}</h2>`;
  const temp = `<h2>Temp: ${data.main.temp}</h2>`;
  const feelstemp = `<h2>Feels Like: ${data.main.feels_like}</h2>`;

  demoDiv.innerHTML = `${name}${currWeather}${humidity}${temp}${feelstemp}`;
};
