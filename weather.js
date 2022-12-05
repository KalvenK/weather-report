const api = {
    base: "https://api.openweathermap.org/data/2.5/", //api.openweathermap.org
    key: "1ac4ef743c8c6da1b0de79d13598b76b"
}

const searchBox = document.querySelector('.search-box');
searchBox.addEventListener('keypress', searchRes);

function searchRes(event) {
    if (event.keyCode == 13) {
        getResult(searchBox.value);
    } 
}

async function getResult(query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(getData => getData.json())
     .then(displayResults);
}

function displayResults(weather) {
    console.log(weather);

    let cDate = new Date();
    const city = document.querySelector('.location .city');
    city.innerHTML = `${weather.name}, ${weather.sys.country}`;

    const date = document.querySelector('.location .date');
    date.innerHTML = currentDate(cDate);

    let temprature = document.querySelector('.current .temp');
    temprature.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

    const weatherRep = document.querySelector('.current .weather');
    weatherRep.innerHTML = `${weather.weather[0].description}`;

    const currentTemp = document.querySelector('.current .hi-low');
    currentTemp.innerHTML = `${Math.round(weather.main.temp_min)} / ${Math.round(weather.main.temp_max)}`;

}



function currentDate(date) {
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

let day = days[date.getDay()];
let dates = date.getDate();
let month = months[date.getMonth()];
let year = date.getFullYear();

return `${day}, ${dates}, ${month}, ${year}`
}