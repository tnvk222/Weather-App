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
    let currentTemperature = weatherData.current.temperature_2m + "°"
    let index = getIndex(weatherData)
    let rain = weatherData.hourly.precipitation_probability[index] + "%"


    rainChance[0].textContent = rain
    rainChance[1].textContent = rain
    currentDegree.textContent = currentTemperature
    cityInput.textContent = citySearch.value.toLowerCase()
}
const getIndex = (weatherData) => {
    let time = weatherData.current.time
    let formattedTime = time.slice(0,13) + ":00"
    console.log(formattedTime)
    let index = weatherData.hourly.time.findIndex(time => time == formattedTime)
    return index
}

const weeklyForecast = (weatherData) =>{
    let time = weatherData.current.time
    let hourIndex = getIndex(weatherData)
    let weeklyArray = []
    for (let index = 0; index < 6; index++) {
        hourIndex +=3
        let weeklyTime = weatherData.hourly.time[hourIndex]
        weeklyTime = new Date(weeklyTime)
        let hour = weeklyTime.toLocaleTimeString("en-us", {
            hour12: true,
            hour: "numeric",
            minute: "numeric"
        })
        let weeklyDegree = weatherData.hourly.temperature_2m[hourIndex]
        weeklyArray.push({time : hour, temperature : weeklyDegree})
    }
    plus3hours.textContent = weeklyArray[0].time
    plus6hours.textContent = weeklyArray[1].time
    plus9hours.textContent = weeklyArray[2].time
    plus12hours.textContent = weeklyArray[3].time
    plus15hours.textContent = weeklyArray[4].time
    plus18hours.textContent = weeklyArray[5].time

    plus3hoursDegree.textContent = weeklyArray[0].temperature + "°"
    plus6hoursDegree.textContent = weeklyArray[1].temperature + "°"
    plus9hoursDegree.textContent = weeklyArray[2].temperature + "°"
    plus12hoursDegree.textContent = weeklyArray[3].temperature + "°"
    plus15hoursDegree.textContent = weeklyArray[4].temperature + "°"
    plus18hoursDegree.textContent = weeklyArray[5].temperature + "°"

}
const airConditions = (weatherData) => {
    realFeel.textContent = weatherData.current.apparent_temperature + "°"
    windSpeed.textContent = weatherData.current.wind_speed_10m +" "+ weatherData.current_units.wind_speed_10m
    UVIndex.textContent = weatherData.current.uv_index 

}


var cityInput = document.getElementById("city")
var citySearch = document.getElementById("searchBar")
var currentDegree = document.getElementById("currentDegree")
var rainChance = document.getElementsByClassName("rainChance")
var form  = document.getElementById("form")

var plus3hours = document.getElementById("plus3hours")
var plus6hours = document.getElementById("plus6hours")
var plus9hours = document.getElementById("plus9hours")
var plus12hours = document.getElementById("plus12hours")
var plus15hours = document.getElementById("plus15hours")
var plus18hours = document.getElementById("plus18hours")

var plus3hoursDegree = document.getElementById("plus3hoursDegree")
var plus6hoursDegree  = document.getElementById("plus6hoursDegree")
var plus9hoursDegree  = document.getElementById("plus9hoursDegree")
var plus12hoursDegree  = document.getElementById("plus12hoursDegree")
var plus15hoursDegree  = document.getElementById("plus15hoursDegree")
var plus18hoursDegree  = document.getElementById("plus18hoursDegree")

var realFeel = document.getElementById("realFeel")
var windSpeed = document.getElementById("windSpeed")
var UVIndex = document.getElementById("UVIndex")


form.addEventListener("submit", async function(e){//"e is simply the parameter that lets us control and extract info from the event"
    e.preventDefault()
    const weather = await fetchWeather(citySearch.value)
    currentWeather(weather)
    weeklyForecast(weather)
    airConditions(weather)
})

