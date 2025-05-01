function getWeather() {
  const apiKey = `946d1940c741e2aaf87700b04bfff0be`; // replace with your API key
  const city = document.getElementById('city').value;

  if (!city) {
    alert("Please enter a city");
    return;
  }

  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  fetch(currentWeatherUrl)
    .then(response => response.json())
    .then(data => {
      displayWeather(data);
    })
    .catch(error => {
      console.error('Error fetching current weather data:', error);
      alert('Error fetching current weather data. Please try again.');
    });

  fetch(forecastUrl)
    .then(response => response.json())
    .then(data => {
      displayHourlyForecast(data.list);
    })
    .catch(error => {
      console.error('Error fetching hourly forecast data:', error);
      alert('Error fetching hourly forecast data. Please try again.');
    });

  function displayWeather(data) {
    const tempDivInfo = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');
    const hourlyForecastDiv = document.getElementById('hourly-forecast');

    // Clear previous content
    tempDivInfo.innerHTML = '';
    weatherInfoDiv.innerHTML = '';
    hourlyForecastDiv.innerHTML = '';
    tempDivInfo.className = '';
    weatherInfoDiv.className = '';
    weatherIcon.className = '';

    if (data.cod === '404') {
      weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
      return;
    }

    const cityName = data.name;
    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

    // Set content
    tempDivInfo.innerHTML = `<p>${temperature}°C</p>`;
    weatherInfoDiv.innerHTML = `<p>${cityName}</p><p>${description}</p>`;
    weatherIcon.src = iconUrl;
    weatherIcon.alt = description;

    // Add animations
    tempDivInfo.classList.add('fade-in');
    weatherInfoDiv.classList.add('fade-in');
    weatherIcon.classList.add('fade-in');
    weatherIcon.style.display = 'block';
  }

  function displayHourlyForecast(hourlyData) {
    const hourlyForecastDiv = document.getElementById('hourly-forecast');
    hourlyForecastDiv.innerHTML = '';

    const next24Hours = hourlyData.slice(0, 8);

    next24Hours.forEach(item => {
      const dateTime = new Date(item.dt * 1000);
      const hour = dateTime.getHours();
      const temperature = Math.round(item.main.temp);
      const iconCode = item.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

      const hourlyItemHtml = `
        <div class="hourly-item fade-in">
          <span>${hour}:00</span>
          <img src="${iconUrl}" alt="Hourly Weather Icon">
          <span>${temperature}°C</span>
        </div>
      `;
      hourlyForecastDiv.innerHTML += hourlyItemHtml;
    });
  }
}
