// --- Global Constants and Selectors ---
const weatherApiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
const weatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather';
const weatherContainer = document.getElementById('weather-details');
const weatherStatus = document.getElementById('weather-status');
const currentDateSpan = document.getElementById('current-date');
const currentTimeSpan = document.getElementById('current-time');
const dynamicList = document.getElementById('dynamic-list');

// --- Function to fetch and display weather data ---
async function fetchWeather(city = 'New Cairo City', countryCode = 'EG') {
    weatherStatus.textContent = 'Fetching weather data...';
    try {
        const response = await fetch(`${weatherApiUrl}?q=${city},${countryCode}&appid=${weatherApiKey}&units=metric`);
        if (!response.ok) {
            throw new Error(`Weather data not found for ${city}. Status: ${response.status}`);
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error('Error fetching weather:', error);
        weatherStatus.textContent = `Failed to load weather for ${city}. Please try again later.`;
        weatherContainer.innerHTML = ''; // Clear any previous details
    }
}

function displayWeather(data) {
    weatherStatus.textContent = `Weather in ${data.name}, ${data.sys.country}:`;
    weatherContainer.innerHTML = `
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Feels like: ${data.main.feels_like}°C</p>
        <p>Condition: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
}

// --- Function to update date and time in footer ---
function updateDateTime() {
    const now = new Date();

    // Format date
    const optionsDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    currentDateSpan.textContent = now.toLocaleDateString(undefined, optionsDate);

    // Format time (24-hour format with seconds)
    const optionsTime = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    currentTimeSpan.textContent = now.toLocaleTimeString(undefined, optionsTime);
}

// --- Function to dynamically modify the data section ---
function addDynamicListItem() {
    const newItem = document.createElement('li');
    newItem.textContent = `Item ${dynamicList.children.length + 1}: Dynamically added on ${new Date().toLocaleTimeString()}`;
    dynamicList.appendChild(newItem);
    // Optional: Limit the number of items or remove old ones
    if (dynamicList.children.length > 5) {
        dynamicList.removeChild(dynamicList.firstElementChild);
    }
}

// --- Event Listener for DOMContentLoaded ---
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed.');

    // 1. Initial display of date and time
    updateDateTime();
    // Update time every second
    setInterval(updateDateTime, 1000);

    // 2. Fetch and display weather for New Cairo City, Egypt (as per context)
    fetchWeather('New Cairo City', 'EG');

    // 3. Demonstrate dynamic modification of data section
    // You could trigger this with a button, or just have it run periodically
    setInterval(addDynamicListItem, 5000); // Add a new item every 5 seconds
});



// --- Function to fetch and display weather data ---
async function fetchWeather(city = 'New Cairo City', countryCode = 'EG') {
    weatherStatus.textContent = 'Fetching weather data...';
    try {
        const response = await fetch(`${weatherApiUrl}?q=${city},${countryCode}&appid=${weatherApiKey}&units=metric`);
        if (!response.ok) {
            throw new Error(`Weather data not found for ${city}. Status: ${response.status}`);
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error('Error fetching weather:', error);
        weatherStatus.textContent = `Failed to load weather for ${city}. Please try again later.`;
        weatherContainer.innerHTML = ''; // Clear any previous details
    }
}

function displayWeather(data) {
    console.log("Weather Data Received:", data);

    const iconCode = data.weather[0].icon;
    const iconAlt = data.weather[0].description;
    const openWeatherMapPngUrl = `https://openweathermap.org/img/w/${iconCode}.png`;
    // Path to your local SVG icon for mobile view
    const mobileSvgIconUrl = 'images/weather-icon-mobile.svg'; // Use the placeholder SVG

    // Capitalize the first letter of the description
    const condition = iconAlt.charAt(0).toUpperCase() + iconAlt.slice(1);

    // Build the HTML for the weather details, including the <picture> element
    weatherContainer.innerHTML = `
        <div class="weather-icon-wrapper">
            <picture>
                <source srcset="${mobileSvgIconUrl}" media="(max-width: 768px)" type="image/svg+xml">
                <img src="${openWeatherMapPngUrl}" alt="${iconAlt}" class="weather-icon">
            </picture>
            <p>${condition}</p>
        </div>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Feels like: ${data.main.feels_like}°C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;

    weatherStatus.textContent = `Weather in ${data.name}, ${data.sys.country}:`;
}

// ... (rest of the script.js code) ...