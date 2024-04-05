const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const apiKey = '6fe3d46f334ecfdf0a09d1a0ae1dc14f';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

const searchBox = $('.search input');
const searchBtn = $('.search button');
const weatherIcon = $('.weather-icon');

async function checkWeather(city = 'london') {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if (response.status == 404) {
        $('.error').classList.add('active');
        setTimeout(() => {
            $('.error').classList.remove('active');
        }, 2000);
    } else {
        var data = await response.json();

        if (data.name === 'Hanoi') {
            $('.city').innerHTML = `Ha Noi`;
        } else {
            $('.city').innerHTML = `${data.name}`;
        }
        $('.temp').innerHTML = `${Math.round(data.main.temp)}°C`;
        $('.humidity').innerHTML = `${data.main.humidity}%`;
        $('.wind').innerHTML = `${data.wind.speed}`;

        if (data.weather[0].main == 'Clouds') {
            weatherIcon.src = './img/cloud.png';
        } else if (data.weather[0].main == 'Clear') {
            weatherIcon.src = './img/clear.png';
        } else if (data.weather[0].main == 'Rain') {
            weatherIcon.src = './img/rain.png';
        } else if (data.weather[0].main == 'Drizzle') {
            weatherIcon.src = './img/drizzle.png';
        } else if (data.weather[0].main == 'Mist') {
            weatherIcon.src = './img/mist.png';
        }
    }
}
checkWeather();
searchBtn.onclick = () => {
    checkWeather(searchBox.value);
};

searchBox.onkeypress = (event) => {
    if (event.key === 'Enter') {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        searchBtn.onclick();
    }
};
