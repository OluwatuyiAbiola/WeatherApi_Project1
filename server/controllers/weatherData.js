const https = require("https");
const apikey = process.env.API_KEY;

exports.getWeatherData = function(query){
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid=" + apikey + "&units=metric";
    https.get(url, (response)=>{
        if(response.statusCode === 200){
            response.on("data", (data)=>{
                const weatherData = JSON.parse(data);
                return weatherData;
                
            });
        } else{
            console.log("Unsuccessful");
        }
    }).on("error", (e)=>{
        console.error(e);
    });
   
}