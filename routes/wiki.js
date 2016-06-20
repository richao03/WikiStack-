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

            var entry = Page.build({
                url_title: req.body.title.replace(/\W+/g, "_"),
                title: req.body.title,
                content: req.body.content

            });

            entry.save()
                .then(function(savedEntry) {
                  console.log(Page.route)
                    // res.redirect("/wiki/" + savedEntry.dataValues.urlTitle)
                })
                .catch(function (error){
                  console.log(error)
                })


        }),

        router.get('/add', function(req, res, next) {

            res.render("addpage.html")
        }),

        router.get("/:urlTitle", function(req, res, next) {
          Page.findOne({ where: {urlTitle: req.params.urlTitle}})
          .then ( function (entry){
            var e = entry.dataValues;
            res.render("wikipage", {title: e.title, urlTitle: e.urlTitle, content: e.content})
          })
          .catch(next);
        })


    return router;



}


module.exports = returnRouter;
