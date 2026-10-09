const fetchWeather = async (city) =>{
    try {
        const locationSearch = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`);
        const data = await locationSearch.json()
        console.log(data)
        if (!data.results || data.results.length == 0){
            cityInput.textContent = "city not found"
            return
        }
        const latitude = data.results[0].latitude
        const longitude = data.results[0].longitude

        const weatherResponse = await fetch (`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=apparent_temperature,temperature_2m,wind_speed_10m,weather_code,is_day,uv_index&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code,precipitation_probability&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto`);
        const weatherData = await weatherResponse.json()
        return weatherData

    } catch (error) {
        console.log(error.message);
    }
    finally{
        console.log("end of the program")
    }
   
}
const currentWeather = (weatherData) => {
    console.log(weatherData)
    let currentTemperature = weatherData.current.temperature_2m + "°"
    let index = getIndex(weatherData)
    let rain = weatherData.hourly.precipitation_probability[index] + "%"


    rainChance.textContent = rain
    currentDegree.textContent = currentTemperature
    cityInput.textContent = citySearch.value.toLowerCase()
}
const getIndex = (weatherData) => {
    let time = weatherData.current.time
    console.log(time)
    let formattedTime = time.slice(0,13) + ":00"
    console.log(formattedTime)
    let index = weatherData.hourly.time.findIndex(time => time == formattedTime)
    console.log(index)
    return index
}


var cityInput = document.getElementById("city")
var citySearch = document.getElementById("searchBar")
var currentDegree = document.getElementById("currentDegree")
var rainChance = document.getElementById("rainChance")
var form  = document.getElementById("form")
form.addEventListener("submit", async function(e){//"e is simply the parameter that lets us control and extract info from the event"
    e.preventDefault()
    console.log(citySearch.value)
    const weather = await fetchWeather(citySearch.value)
    currentWeather(weather)
})

