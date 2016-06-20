var Express = require("express");
var router = Express.Router();

var returnRouter = function() {

    router.get('/', function(req, res, next) {

        res.render("index.html", {})
    })
    return router;

}


module.exports = returnRouter;
