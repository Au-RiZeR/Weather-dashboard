$(document).ready(function () {
    const apiKey = "166a433c57516f51dfab1f7edaed8413";
    let city = "perth";
    if (!localStorage.names) {
        let names = [];
        localStorage.setItem('names', JSON.stringify(names))
    }

    var storedNames = JSON.parse(localStorage.getItem('names'))
    for (let i = 1; i <= 6; i++) {
        let day = document.getElementById(`day${i}`);
        day.textContent = `${moment().add(i, 'days').format('DD/MM/YY')}`;
    }

    createButtons()
    function createButtons() {
        for (let i = storedNames.length - 1; i >= 0; i--) {
            let search = document.createElement(`button`)
            $(search).addClass('search');
            search.textContent = storedNames[i]
            searches.appendChild(search)
            $('.search').click(function (e) {
                e.preventDefault();
                let sel = e.target
                city = sel.innerHTML
                weather();
            });
        }
    }

    $("#input").keyup(function (e) {
        if (e.keyCode === 13) {
            enter()
        }
    });

    $("#searcher").click(function () {
        enter();
    })

    var enter = function enterF() {
        let input = document.getElementById("input").value;
        city = input;
        if (city) {
            weather();
        }
    };

    function checkCityExists(cityName) {
        return cityName == city;
    }

    function weather() {
        let requestUrl = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=7&appid=${apiKey}&units=metric`;
        fetch(requestUrl).then(function (response) {
            return response.json();
        }).then(function (data) {
            if (!storedNames.some(checkCityExists)) {
                storedNames.push(city)
            }
            if (storedNames.length == 6) {
                storedNames.splice(0, 1)
            }
            let searches = document.getElementById('searches')
            searches.innerHTML = '';
            createButtons()
            localStorage.setItem('names', JSON.stringify(storedNames))
            let lon = data.city.coord.lon
            let lat = data.city.coord.lat
            let uvUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`
            let expand = data.list[0];
            let exTemp = document.getElementById('exTemp');
            let exHumidity = document.getElementById('exHumidity');
            let exWind = document.getElementById('exWind');
            let exDescript = document.getElementById('exDescript');
            exTemp.textContent = `Temp: ${expand.temp.day}ºc`;
            exHumidity.textContent = `Humidity: ${expand.humidity}%`;
            exWind.textContent = `Wind Speed: ${expand.speed}k/h`;
            exDescript.textContent = `${expand.weather[0].description}`;
            let exIcon = document.createElement('img');
            exIcon.src = `http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`;
            exDescript.append(exIcon);
            input.value = '';
            fetch(uvUrl).then(function (response) {
                return response.json();
            }).then(function (data) {
                let uvText = document.getElementById("uvText");
                uvText.textContent = `UV: ${data.daily[0].uvi}`;
                if (data.daily[0].uvi > 7) {
                    uvText.style.backgroundColor = 'red';
                } else {
                    if (data.daily[0].uvi < 4) {
                        uvText.style.backgroundColor = 'green';
                    } else {
                        uvText.style.backgroundColor = 'yellow';
                    }
                }
            })
            for (let i = 1; i <= 6; i++) {
                let day = document.getElementById(`day${i}`);
                day.textContent = `${moment().add(i, 'days').format('DD/MM/YY')}`;
                let description = document.createElement(`p`);
                let humidity = document.createElement(`p`);
                let minTemp = document.createElement(`p`);
                let maxTemp = document.createElement(`p`);
                let icon = document.createElement('img');
                description.textContent = data.list[i].weather[0].description;
                humidity.textContent = `humidity ${data.list[i].humidity}%`;
                minTemp.textContent = `Min Temp: ${data.list[i].temp.min}ºc`;
                maxTemp.textContent = `Max Temp: ${data.list[i].temp.max}ºc`;
                icon.src = `http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png`
                description.append(icon)
                day.append(description, humidity, minTemp, maxTemp);
            };
        });
    }
});