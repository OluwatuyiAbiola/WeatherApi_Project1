const https = require("https");
const date = require("./date");
const apikey = process.env.API_KEY;

//const weatherData = require("./weatherData");
/*
Get weather homepage
*/ 

exports.homepage = async (req,res)=>{
    const day = date.getDate();
    const time = date.getTime();
    const query = "Lagos";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid=" + apikey + "&units=metric";
    https.get(url, (response)=>{
        try{
            response.on("data", (data)=>{
                const weatherData = JSON.parse(data);
                const country = weatherData.sys.country;
                const icon = weatherData.weather[0].icon;
                const weatherDesc = weatherData.weather[0].description;
                const temp = Math.floor(weatherData.main.temp);
                const secondTemp = Math.floor(weatherData.main.feels_like);
                
                const humidity = weatherData.main.humidity;
                const wind = Math.floor(weatherData.wind.speed);
                const visibility = weatherData.visibility / 1000;
                const imgUrl = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";
                res.render("index", {
                    city: query,
                    Country: country,
                    Desc: weatherDesc,
                    Temp: temp, 
                    feels_like: secondTemp,
                    hum: humidity,
                    win: wind,
                    visi: visibility,
                    img: imgUrl,
                    Day: day,
                    Time: time
                });
            });
        } catch(error){
            console.log(error);
        }
    }).on("error", (e)=>{
        console.error(e);
    });
    
}

exports.city = async(req, res)=>{
    const postQuery = req.body.search;
    const day = date.getDate();
    const time = date.getTime();
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ postQuery +"&appid=" + apikey + "&units=metric";
    https.get(url, (response)=>{
        try{
            response.on("data", (data)=>{
                const weatherData = JSON.parse(data);
                const country = weatherData.sys.country;
                const icon = weatherData.weather[0].icon;
                const weatherDesc = weatherData.weather[0].description;
                const temp = Math.floor(weatherData.main.temp);
                const secondTemp = Math.floor(weatherData.main.feels_like);
                
                const humidity = weatherData.main.humidity;
                const wind = Math.floor(weatherData.wind.speed);
                const visibility = weatherData.visibility;
                const imgUrl = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";
                res.render("index", {
                    city: postQuery,
                    Country: country,
                    Desc: weatherDesc,
                    Temp: temp, 
                    feels_like: secondTemp,
                    hum: humidity,
                    win: wind,
                    visi: visibility,
                    img: imgUrl, 
                    Day: day,
                    Time: time
                });
            });
        } catch(error){
            console.log(error);
        }
    }).on("error", (e)=>{
        console.error(e);
    });
}