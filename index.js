// After submit, app should call to the Open Weather API's using the JavaScript fetch API
// app should display the current weather information on the page
// https://api.openweathermap.org/data/2.5/weather?q=&units=imperial&appid=45d56c548b8455a36b81e07e6ba78d5d


// async/await, let/const

const URL = 'https://api.openweathermap.org/data/2.5/weather?q='
const KEY = '&units=imperial&appid=45d56c548b8455a36b81e07e6ba78d5d'
const weatherDiv = document.getElementById('weather')
const form = document.querySelector('form')

form.onsubmit = async function(e) {
    e.preventDefault()
    const searchQuery = this.search.value
    if (!searchQuery) return
    form.search.value = ""

    try {
        const res = await fetch(`${URL}${searchQuery}${KEY}`)    
        const data = await res.json()
        getWeather(data)
    } catch (error) {
        weatherDiv.innerHTML = '<p>Location not found!</p>'
    }
} 

// destructuring, template literals, arrow function

getWeather = data => {
    const { name, sys: { country }, coord: { lat, lon }, weather: [{ icon, description }], main: { temp, feels_like }, dt } = data

    const timeString = new Date(dt * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
    
    weatherDiv.innerHTML = `<h2>${name}, ${country}</h2>
        <a href="https://www.google.com/maps/search/?api=1&query=${lat},${lon}" target="_blank">click to view map</a>
        <img src="https://openweathermap.org/img/wn/${icon}@2x.png">
        <p>${description}</p>
        <p>Current: ${temp} °F</p>
        <p>Feels Like: ${feels_like} °F</p>
        <p>Last Updated: ${timeString}</p>`

    console.log(data)

}