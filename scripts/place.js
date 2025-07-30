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

// --- Example of another event listener (e.g., a button click) ---
// Let's assume you have a button in your HTML like: <button id="add-item-btn">Add Item</button>
// If you add that button:
/*
document.addEventListener('DOMContentLoaded', () => {
    const addItemBtn = document.getElementById('add-item-btn');
    if (addItemBtn) {
        addItemBtn.addEventListener('click', () => {
            alert('Button clicked! You could fetch new data here.');
            // Or directly call a function that modifies HTML
            addDynamicListItem();
        });
    }
});
*/