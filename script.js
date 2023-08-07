var key = "34a156fbcd5baf44f4b8fa0651a77c85"
var search = document.querySelector(".search")
var searchBtn = document.querySelector(".searchBtn")
var current = document.querySelector(".current")
var forecast = document.querySelector(".forecast")
var input = document.querySelector(".input")

searchBtn.addEventListener("click", function(event) {
    event.preventDefault()
    var city = input.value
    getData(city)
})

function getData(cityName) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}`)
    .then(function(res) {
        return res.json()
    })
    .then(function(data) {
        console.log(data)
    })

}
