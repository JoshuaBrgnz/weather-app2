const apiKey = 'f9d9773216af9ffca2ebe087eaab966a';
const lat = 43.65107; // Latitude for Toronto
const lon = -79.347015; // Longitude for Toronto
const forecastElement = document.getElementById('forecast');

async function getWeatherForecast() {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=${apiKey}`);
        const data = await response.json();
        console.log(data); // Log the data to check if it's fetched correctly
        displayForecast(data);
    } catch (error) {
        console.error('Error fetching the weather data:', error);
        forecastElement.innerHTML = '<p>Failed to load weather data. Please try again later.</p>';
    }
}

function displayForecast(data) {
    forecastElement.innerHTML = '';

    data.daily.slice(0, 7).forEach((day, index) => {
        const date = new Date(day.dt * 1000).toLocaleDateString();
        const temp = Math.round(day.temp.day);
        const weatherDescription = day.weather[0].description;
        const icon = day.weather[0].icon;

        forecastElement.innerHTML += `
            <div class="forecast-day">
                <h3>Day ${index + 1}</h3>
                <p>${date}</p>
                <img src="http://openweathermap.org/img/wn/${icon}.png" alt="${weatherDescription}">
                <p>${temp}°C</p>
                <p>${weatherDescription}</p>
            </div>
        `;
    });
}

getWeatherForecast();
