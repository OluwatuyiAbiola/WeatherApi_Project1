const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const https = require("https");
const { stripVTControlCharacters } = require("util");
const { url } = require("inspector");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;
const apikey = process.env.API_KEY;



app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req,res)=>{
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
        } catch (error){
            console.log(error);
        }
    }).on("error", (e)=>{
        console.error(e);
    });
});

app.post("/", (req, res)=>{
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
});


app.listen(port, ()=>{
    console.log('Server is live at port ' + port);
});