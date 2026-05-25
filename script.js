const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const weatherInfo = document.getElementById('weather-info');
const cityName = document.getElementById('city-name');
const temp = document.getElementById('temp');
const desc = document.getElementById('desc');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');

searchBtn.addEventListener('click', () => {
    const city = cityInput.value;
    if (city === "") {
        alert("Please enter a city name");
        return;
    }
    getWeatherData(city);
});

async function getWeatherData(city) {
    weatherInfo.classList.remove('visible');
    
    try {
        const response = await fetch(`https://wttr.in/${city}?format=j1`);

        if (!response.ok) {
            throw new Error("City not found"); 
        }
        
        const data = await response.json();
        const current = data.current_condition[0];
            
       
        cityName.innerText = data.nearest_area[0].areaName[0].value;
        temp.innerText = current.temp_C; 
        desc.innerText = current.weatherDesc[0].value;
        humidity.innerText = `${current.humidity}%`;
        wind.innerText = `${current.windspeedKmph} km/h`;
    
        weatherInfo.classList.add('visible');
        
    } catch(error) {
        alert("Could not find weather data for the city. Try again!");
    }
}