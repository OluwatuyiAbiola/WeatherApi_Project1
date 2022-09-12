const https = require("https");

exports.getWeatherData = function(query){
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid=" + apikey + "&units=metric";
    https.get(url, (response)=>{
        if(!err){
            response.on("data", (data)=>{
                const weatherData = JSON.parse(data);
                const icon = weatherData.weather[0].icon;
                const temp = Math.floor(weatherData.main.temp);
                const weatherDesc = weatherData.weather[0].description;
                const min_temp = Math.floor(weatherData.main.temp_min);
                const max_temp = Math.floor(weatherData.main.temp_max);
                const humidity = weatherData.main.humidity;
                const wind = Math.floor(weatherData.wind.speed);
                const imgUrl = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";
                return {temp, weatherDesc, min_temp, max_temp, humidity, wind, imgUrl};
            });
        } else{
            console.log("Unsuccessful");
        }
    });
}