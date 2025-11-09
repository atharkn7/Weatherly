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

// Initializing Variables
let search;
let city;

// Autocompletes user city
function autocomplete() {
    // Disabling button
    if (city.value.length > 0) {
        search.disabled = false;
    } else {
        search.disabled = true;
    }

    // API CALL
    document.querySelector('#tester').innerHTML = city.value;
}

// Gets Weather Data
function current_weather() {
    const city_name = city.value.toUpperCase();
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=89ea568429f921975234377ad5c8fd63&units=metric`)   // DEMO API Key[Free tier]
        .then(response => response.json())
        .then(data => {
            // Updating HTML
            document.querySelector('#city_heading').innerHTML = city_name;
            document.querySelector('#temp').innerHTML = `${data.main.temp.toFixed(0)}°`;
            document.querySelector('#feels_like').innerHTML = `${data.main.feels_like.toFixed(0)}°`;
            // Grid values
            document.querySelector('#temp_min').innerHTML = `${data.main.temp_min.toFixed(0)}`;
            document.querySelector('#temp_max').innerHTML = `${data.main.temp_max.toFixed(0)}`;
            document.querySelector('#pressure').innerHTML = data.main.pressure;
            document.querySelector('#humidity').innerHTML = data.main.humidity;
            document.querySelector('#wind_speed').innerHTML = data.wind.speed;
            document.querySelector('#description').innerHTML = data.weather[0].description.toUpperCase();;

            // Checking
            console.log(`Temp: ${data.main.temp}`);
        })
        .catch(error => {
            console.log('Error', error)
        })
}


document.addEventListener('DOMContentLoaded', () => {
    // Assigning Variables
    search = document.querySelector('button');
    city = document.querySelector('#city');

    // Keeping search disabled
    search.disabled = true;

    // City Autocomplete
    city.onkeyup = () => {
        setInterval(autocomplete, 400);
    }

    // Weather Data on Form Submit
    document.querySelector('form').onsubmit = () => {
        current_weather();
        // Stopping form submission
        return false;
    }


})