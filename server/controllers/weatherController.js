const https = require("https");
const apikey = process.env.API_KEY

//const weatherData = require("./weatherData");
/*
Get weather homepage
*/ 

exports.homepage = async (req,res)=>{
    const query = "London";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid=" + apikey + "&units=metric";
    https.get(url, (response)=>{
        try{
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
                res.render("index", {
                    Temp: temp, 
                    Desc: weatherDesc, 
                    min:min_temp,
                    max: max_temp,
                    hum: humidity,
                    win: wind,
                    img: imgUrl,
                    city: query
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
    const postQuery = req.body.city;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ postQuery +"&appid=" + apikey + "&units=metric";
    https.get(url, (response)=>{
        try{
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
                res.render("index", {
                    Temp: temp, 
                    Desc: weatherDesc, 
                    min:min_temp,
                    max: max_temp,
                    hum: humidity,
                    win: wind,
                    img: imgUrl,
                    city: postQuery
                });
            });
        } catch(error){
            console.log(error);
        }
    }).on("error", (e)=>{
        console.error(e);
    });
}