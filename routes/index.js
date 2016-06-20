var Express = require("express");
var router = Express.Router();
var models = require("../models")
var Page = models.Page;
var User = models.User;

var returnRouter = function() {

    router.get('/', function(req, res, next) {

        Page.findAll({attributes: ['title', 'urlTitle']})
        .then(function(data) {
          var pages = []
          data.forEach(function(page){
            pages.push(page.dataValues);
          })
          console.log(pages);
          res.render("index.html", {pages:pages})
        });
    })
    return router;

}


module.exports = returnRouter;
