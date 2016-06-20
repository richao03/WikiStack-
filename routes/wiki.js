var Express = require("express");
var router = Express.Router();
var models = require("../models")
var Page = models.Page;
var User = models.User;

var returnRouter = function() {

    router.get('/', function(req, res, next) {

            res.redirect("/")
        }),

        router.post('/', function(req, res, next) {
            console.log(req.body)

            var entry = Page.build({
                url_title: req.body.title.replace(/\W+/g, "_"),
                title: req.body.title,
                content: req.body.content
            });

            entry.save()
                .then(function() {
                    console.log("screw promises");
                });
            res.redirect("/")


        }),

        router.get('/add', function(req, res, next) {

            res.render("addpage.html")
        })


    return router;



}


module.exports = returnRouter;
