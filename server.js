//Set ups dependency packages
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

//Create an express server
var app = express();
var PORT = process.env.PORT || 3000;

//Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Routes
require("./app/routing/apiRoutes.js")(app);
require("./app/routing/htmlRoutes.js")(app);

//Listener
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});