var key = "34a156fbcd5baf44f4b8fa0651a77c85"
var search = document.querySelector(".search")
var searchBtn = document.querySelector(".searchBtn")
var current = document.querySelector(".current")
var forecast = document.querySelector(".forecast")
var input = document.querySelector(".input")
var historyEl = document.querySelector(".historyEl")

var info = document.querySelector(".info")
var icon = document.querySelector(".icon")
var temp = document.querySelector(".temp")
var wind = document.querySelector(".wind")
var hum = document.querySelector(".hum")

var forecastCard = document.querySelectorAll(".forecastCard")


searchBtn.addEventListener("click", function(event) {
    var history = JSON.parse(localStorage.getItem("history")) || []
    event.preventDefault()
    var city = input.value
    history.push(city)
    localStorage.setItem("history", JSON.stringify(history))
    getData(city)
    getForecast(city)
    renderHistory()
})

function renderHistory() {
    var history = JSON.parse(localStorage.getItem("history")) || []
    historyEl.innerHTML = ""
    for(var i = 0; i < history.length; i++) {
        var li = document.createElement("button")
        li.innerHTML = history[i]
        historyEl.append(li)
        li.addEventListener("click", function(event) {
            var liValue = event.target.innerHTML;
            getData(liValue)
            getForecast(liValue)
        })
    }
}

renderHistory()

function getData(cityName) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}&units=imperial`)
    .then(function(res) {
        return res.json()
    })
    .then(function(data) {
        console.log(data)
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

function getForecast(cityName) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${key}&units=imperial`)
    .then(function(res) {
        return res.json()
    })
    .then(function(data) {
       console.log(data)
      for(var i = 0; i < forecastCard.length; i++) {
        forecastCard[i].innerHTML = ""
        const index = i * 8 + 4
        var date = new Date(data.list[index].dt * 1000)
        var day = date.getDate()
        var month = date.getMonth() + 1
        var year = date.getFullYear()
        var forecastDate = document.createElement("h5")
        forecastDate.innerHTML = month + "/" + day + "/" + year
        forecastCard[i].append(forecastDate)
        var forecastIcon = document.createElement("img")
        forecastIcon.setAttribute("src", "http://openweathermap.org/img/w/" + data.list[index].weather[0].icon + ".png")
        forecastIcon.setAttribute("alt",  data.list[index].weather[0].description)
        forecastCard[i].append(forecastIcon)
        var forecastTemp = document.createElement("p")
        forecastTemp.innerHTML = "Temp: " + data.list[index].main.temp + "&#176F"
        forecastCard[i].append(forecastTemp)
        var forecastWind = document.createElement("p")
        forecastWind.innerHTML = "Wind: " + data.list[index].wind.speed + "mph"
        forecastCard[i].append(forecastWind)
        var forecastHum = document.createElement("p")
        forecastHum.innerHTML = "Hum: " + data.list[index].main.humidity + "%"
        forecastCard[i].append(forecastHum)
      }
    })
}
