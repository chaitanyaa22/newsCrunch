var express = require("express")
var app = express();
var hbs = require("hbs")
var router = require('./routes/routes')
const mongoose = require('mongoose');
const mongoDbUrl = 'mongodb+srv://cck2222:Cck@1832@newscrunch-paimi.mongodb.net/newsCrunch?retryWrites=true&w=majority';
var cloudinary = require('cloudinary').v2

//<-------------------------------------------------------Body-parser setup---------------------------------------------------->
var bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static("public"))
app.use(express.static("uploads"))
app.set("view engine", "hbs")
//<----------------------------------------------------express-session setup------------------------------------------------->
var session = require("express-session")
app.use(session({
    secret: "khushbudesai's session",
    resave: true,
    saveUninitialized: true
}))
//<-------------------------------------------------------Cloudinary setup---------------------------------------------------->
cloudinary.config({
    cloud_name: "chaitanyakulkarni",
    api_key: "292734224172813",
    api_secret: "zVUf1_R1QLHnZCGyY5tWkati6b0"
})

mongoose.connect(mongoDbUrl, { useNewUrlParser: true, useUnifiedTopology: true });


app.use('/', router)

app.listen(process.env.PORT || 3000);
