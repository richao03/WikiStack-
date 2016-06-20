// Dependencies
var Sequelize = require("sequelize");
var Express = require ("express");
var morgan = require ("morgan");
var bodyParser = require ("body-parser");
var swig = require("swig");
//Local dependencies
var routes = require("./routes");
var models = require("./models")
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
// app.use(bodyParser.json())



//serves up static files from public folder

models.User.sync({})
.then(function(){
  return models.Page.sync({})
})
.then (function(){
var server = app.listen(3000, function(){
  console.log('listening on port 3000');

});
})
.catch(console.error)
app.use('/', routes());
app.use(Express.static("public"));
