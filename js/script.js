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

    } catch (error) {
        console.log(error.message);
    }
    finally{
        console.log("end of the program")
    }
   
}
var cityInput = document.getElementById("city")

