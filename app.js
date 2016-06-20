// Dependencies
var Sequelize = require("sequelize");
var Express = require("express");
var morgan = require("morgan");
var bodyParser = require("body-parser");
var swig = require("swig");
//Local dependencies
var indexRoutes = require("./routes/index");
var models = require("./models")
var wikiRoutes = require("./routes/wiki")

// Initialize Express
var app = new Express();

//swig boilerpate
app.set('views', './views'); //where to find views
app.set('view engine', 'html'); //what file extension do our tempaltes use
app.engine("html", swig.renderFile); //how we want the file to be rendered
swig.setDefaults({ cache: false });

// Logging middleware
var logger = morgan("dev")
app.use(logger)

//using body parser
app.use(bodyParser.urlencoded({ extended: true })); // for HTML form submits
app.use(bodyParser.json()); // would be for AJAX requests


//serves up static files from public folder

models.User.sync({})
    .then(function() {
        return models.Page.sync({})
    })
    .then(function() {
        var server = app.listen(3000, function() {
            console.log('listening on port 3000');

        });
    })
    .catch(console.error)

// Routing
app.use('/', indexRoutes());
app.use('/wiki', wikiRoutes());
app.use(Express.static("public"));
