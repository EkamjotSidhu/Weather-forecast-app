var search = document.getElementById('search')

search.addEventListener('click', function display() {
    var city = document.getElementById('typeCity')
    var display = document.getElementById('cityName')
    var geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city.value}&limit=1&appid=3aeb0185f22329876d558da2db988735`
    fetch(geoUrl)
        .then((response) => response.json())
        .then((data) => {
            var lat = data[0].lat
            var long = data[0].lon
            var weatherUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=3aeb0185f22329876d558da2db988735&units=metric`
            fetch(weatherUrl)
                .then(response => response.json())
                .then(function weatherCheck(data) {
                    var icon = data.list[0].weather[0].icon
                    var date = new Date().toLocaleDateString()

                    if (window.localStorage.getItem('history') == null) {
                        searchHistory = []
                        searchHistory.push(city.value)
                        window.localStorage.setItem('history', JSON.stringify(searchHistory))
                    }
                    else {
                        var searchHistory = (window.localStorage.getItem('history'))
                        var historyArray = JSON.parse(searchHistory)
                        if (!historyArray.includes(city.value)) {
                            historyArray.push(city.value)
                        }

                        window.localStorage.setItem('history', JSON.stringify(historyArray))
                        // window.localStorage.clear()
                    }
                    document.getElementById('history').textContent = ''
                    for (city = 0; city < (historyArray.length); city++) {
                        // console.log(historyArray[city])
                        var historyCity = document.createElement('div')
                        historyCity.textContent = historyArray[city]
                        historyCity.style = 'background-color:lightgrey;text-align:center;margin:10px;border-radius:5px'
                        document.getElementById('history').appendChild(historyCity)
                        // historyCity.addEventListener('click', weatherCheck)
                    }

                    console.log(data)
                    display.innerText = `${data.city.name} (${date})`
                    var weatherIcon = document.getElementById('weatherIcon')
                    weatherIcon.src = ` http://openweathermap.org/img/wn/${icon}@2x.png`
                    weatherIcon.style = 'display:inline;height:25px;width:25px'
                    document.getElementById('tempSpan').textContent = data.list[0].main.temp
                    document.getElementById('windSpan').textContent = data.list[0].wind.speed
                    document.getElementById('humSpan').textContent = data.list[0].main.humidity
                    var dateToday = data.list[39].dt - (5 * 86400)

                    var next5Days = document.getElementsByClassName('days')

                    for (var i = 1; i <= (next5Days.length); i++) {
                        dateToday = dateToday + 86400
                        for (var j = 0; j < data.list.length; j++) {
                            if (data.list[j].dt == dateToday) {
                                var nextDate = document.createElement('p')
                                var currentDate = new Date()
                                var newDate = new Date(currentDate.setDate(currentDate.getDate() + i))
                                var finalDate = newDate.toLocaleDateString()
                                nextDate.textContent = finalDate
                                var forecastIconP = document.createElement('img')
                                forecastIconP.src = ` http://openweathermap.org/img/wn/${data.list[j].weather[0].icon}@2x.png`
                                var forecastTemp = document.createElement('p')
                                forecastTemp.textContent = `Temp: ${data.list[j].main.temp}`
                                var forecastWind = document.createElement('p')
                                forecastWind.textContent = `Wind: ${data.list[j].wind.speed}`
                                var forecastHum = document.createElement('p')
                                forecastHum.textContent = `Humidity: ${data.list[j].main.humidity}`
                                document.getElementById(`day${i}`).textContent = ''
                                document.getElementById(`day${i}`).appendChild(nextDate)
                                document.getElementById(`day${i}`).appendChild(forecastIconP)
                                document.getElementById(`day${i}`).appendChild(forecastTemp)
                                document.getElementById(`day${i}`).appendChild(forecastWind)
                                document.getElementById(`day${i}`).appendChild(forecastHum)
                                document.getElementById(`day${i}`).style = 'padding:10px;width: 13vw;background-color:rgb(28, 28, 65); color:white;margin:10px;border-radius:5px'

                            }
                        }
                    }
                })
        })

})