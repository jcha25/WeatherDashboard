var key = "34a156fbcd5baf44f4b8fa0651a77c85"
var search = document.querySelector(".search")
var searchBtn = document.querySelector(".searchBtn")
var current = document.querySelector(".current")
var forecast = document.querySelector(".forecast")
var input = document.querySelector(".input")

var info = document.querySelector(".info")
var icon = document.querySelector(".icon")
var temp = document.querySelector(".temp")
var wind = document.querySelector(".wind")
var hum = document.querySelector(".hum")

searchBtn.addEventListener("click", function(event) {
    event.preventDefault()
    var city = input.value
    getData(city)
})

function getData(cityName) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}&units=imperial`)
    .then(function(res) {
        return res.json()
    })
    .then(function(data) {
        var date = new Date()
        var day = date.getDate()
        var month = date.getMonth() + 1
        var year = date.getFullYear()
        info.innerHTML = data.name + " " + month + "/" + day + "/" + year
        icon.setAttribute("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png")
        icon.setAttribute("alt", data.weather[0].description)
        temp.innerHTML = "Temp: " + data.main.temp + "&#176F"
        wind.innerHTML = "Wind: " + data.wind.speed + "mph"
        hum.innerHTML = "Hum: " + data.main.humidity + "%"
    })
}
