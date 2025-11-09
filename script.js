/*
TODO: 
- Disable relevant input fields (enable city after country and disable search until end)
- ° <-- symbol
*/

// Getting list of cities using API
const url = 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities';
const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': 'fda943fa42mshc61b5e7848abdd2p144338jsn6aa2f46052dd',
        'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com'
    }
};


// Variables
let search;
let city;
let debounceTimer;

// HTML Elements (Created)
let elements = {
    cityHeading: undefined,
    temp: undefined,
    feelsLike: undefined,
    // Grid Elements
    minTemp: undefined,
    maxTemp: undefined,
    pressure: undefined,
    humidity: undefined,
    windSpeed: undefined,
    description: undefined,
}

// Clears all weather data from the UI
function clearUI() {
    Object.values(elements).forEach(el => {
        if (!el) return;

        if ('value' in el) el.value = '';          // for inputs
        else if ('textContent' in el) el.textContent = '';  // for display elements
    });

    if (city && 'value' in city) city.value = '';
}


function alert() {
    const alertContainer = document.getElementById('alert-container');
    alertContainer.innerHTML = `
        <div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Invalid city name.</strong> Please try again.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;
}

// Autocompletes user city
function autocomplete() {
    const cityValue = city.value.trim();

    // Enabling search button if input not empty
    if (cityValue.length > 0) {
        search.disabled = false;
    } else {
        search.disabled = true;
    }

    // API CALL
    document.querySelector('#tester').innerHTML = city.value;
}


// Gets Weather Data
function current_weather() {
    const city_name = city.value.trim();

    // Validation
    if (!city_name) {
        alert();
    }

    // API Options
    const url = 'https://api.openweathermap.org/data/2.5/weather?q='
    const api_key = '89ea568429f921975234377ad5c8fd63'    // DEMO API Key[Free tier]
    const units = 'metric'

    // https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=89ea568429f921975234377ad5c8fd63&units=metric
    fetch(`${url}${city_name}&appid=${api_key}&units=${units}`)
        .then(response => response.json())
        .then(data => {
            // Updating HTML
            elements.cityHeading.innerHTML = city_name.toUpperCase();
            elements.temp.innerHTML = `${data.main.temp.toFixed(0)}°`;
            elements.feelsLike.innerHTML = `${data.main.feels_like.toFixed(0)}°`;

            // Grid values
            elements.minTemp.innerHTML = `${data.main.temp_min.toFixed(0)}`;
            elements.maxTemp.innerHTML = `${data.main.temp_max.toFixed(0)}`;
            elements.pressure.innerHTML = data.main.pressure;
            elements.humidity.innerHTML = data.main.humidity;
            elements.windSpeed.innerHTML = data.wind.speed;
            elements.description.innerHTML = data.weather[0].description.toUpperCase();;

            // Checking
            console.log(`Temp: ${data.main.temp}`);
        })
        .catch(error => {
            clearUI();
            alert();
            console.error(error);
        })
}



document.addEventListener('DOMContentLoaded', () => {
    // Assigning Variables
    search = document.querySelector('#submit');
    city = document.querySelector('#city');
    const resetBtn = document.getElementById('reset');

    // Assigning HTML elements to elements object
    elements.cityHeading = document.querySelector('#city_heading');
    elements.temp = document.querySelector('#temp');
    elements.feelsLike = document.querySelector('#feels_like');

    elements.minTemp = document.querySelector('#temp_min');
    elements.maxTemp = document.querySelector('#temp_max');
    elements.pressure = document.querySelector('#pressure');
    elements.humidity = document.querySelector('#humidity');
    elements.windSpeed = document.querySelector('#wind_speed');
    elements.description = document.querySelector('#description');

    // Attach the click event listener
    resetBtn.addEventListener('click', () => {
        clearUI();
    });

    // Keeping search disabled
    search.disabled = true;

    // Using a debounce (FROM CHATGPT)
    city.onkeyup = () => {
        clearTimeout(debounceTimer)
        debounceTimer = setTimeout(autocomplete, 400);
    };

    // Weather Data on Form Submit
    document.querySelector('form').onsubmit = () => {
        current_weather();
        // Stopping form submission
        return false;
    }


})