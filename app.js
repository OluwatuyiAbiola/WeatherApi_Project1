const express = require("express");
const bodyParser = require("body-parser");
const expressLayouts = require("express-ejs-layouts");
const { stripVTControlCharacters } = require("util");
const { url } = require("inspector");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;




app.use(expressLayouts);
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("layout", "./layouts/main");

const route = require("./server/routes/weatherRoutes.js");

app.use("/", route);


app.listen(port, ()=>{
    console.log('Server is live at port ' + port);
});