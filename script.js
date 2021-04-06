$(document).ready(function() {

    const apiKey = "166a433c57516f51dfab1f7edaed8413";
    let url = 'https://api.openweathermap.org/data/2.5/';

    let requestType = "";
    let query = "";
    let city = "perth";
    let request = new XMLHttpRequest();
    // requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    let p = document.getElementById("p")
        // let input = document.getElementById("input").innerText
    for (let i = 1; i <= 6; i++) {
        console.log(i)
        let day = document.getElementById(`day${i}`)
        day.textContent = `${moment().add(i, 'days').format('DD/MM/YY')}`
    }
    $("button").click(function(e) {
        e.preventDefault();
        // city = 
        let input = document.getElementById("input").value
        city = input
        console.log(city)
        console.log(input)
        requestUrl = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=7&appid=${apiKey}&units=metric`;
        console.log(requestUrl)
        weather()
    });

    function weather() {
        fetch(requestUrl).then(function(response) {
            return response.json();
        }).then(function(data) {
            console.log(data)
            console.log(data.list[0].temp.day);
            let expand = data.list[0];
            let exTemp = document.getElementById('exTemp')
            let exHumidity = document.getElementById('exHumidity')
            let exWind = document.getElementById('exWind')
            let exDescript = document.getElementById('exDescript')
            exTemp.textContent = `Temp: ${expand.temp.day}`
            exHumidity.textContent = `Humidity: ${expand.humidity}%`
            exWind.textContent = `Wind Speed: ${expand.speed}k/h`
            exDescript.textContent = `${expand.weather[0].description}`
                // expanded
            for (let i = 1; i <= 6; i++) {
                console.log(i)
                let day = document.getElementById(`day${i}`)
                day.textContent = `${moment().add(i, 'days').format('DD/MM/YY')}`
                let br = document.createElement(`br`)
                let description = document.createElement(`p`)
                let humidity = document.createElement(`p`)
                let minTemp = document.createElement(`p`)
                let maxTemp = document.createElement(`p`)
                description.textContent = data.list[i].weather[0].description
                humidity.textContent = `humidity ${data.list[i].humidity}%`
                minTemp.textContent = `Min Temp: ${data.list[i].temp.min}ºc`
                maxTemp.textContent = `Max Temp: ${data.list[i].temp.max}ºc`
                day.append(description, humidity, minTemp, maxTemp)
            }
        });
    }












});