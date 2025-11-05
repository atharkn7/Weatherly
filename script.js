/* 
DEMO API Key [Free tier]
https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=89ea568429f921975234377ad5c8fd63&units=metric

Countries API - https://restcountries.com/

Cities - https://rapidapi.com/wirefreethought/api/geodb-cities
*/

/*
TODO: 
- Disable relevant input fields (enable city after country and disable search until end)
- ° <-- symbol
*/


document.addEventListener('DOMContentLoaded', () => {

    document.querySelector('form').onsubmit = () => {
        let city = document.querySelector('#city').value.toUpperCase();

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},uk&appid=89ea568429f921975234377ad5c8fd63&units=metric`)
            .then(response => response.json())
            .then(data => {
                // Getting values

                // Updating HTML
                document.querySelector('#city_heading').innerHTML = city;
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

        // Stopping form submission
        return false;
    }


})