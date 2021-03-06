var utils = require('../utils.js')
var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack', {
    logging: false
});

var Page = db.define('page', {
      title: {
          type: Sequelize.STRING,
          allowNull: false
      },
      urlTitle: {
          type: Sequelize.STRING,
          allowNull: false
      },
      content: {
          type: Sequelize.TEXT,
          allowNull: false
      },
      status: {
          type: Sequelize.ENUM('open', 'closed')
      },
      date: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW
      },
      route: {
          type: Sequelize.VIRTUAL,
          get: function() {
              return "/wiki/" + this.urlTitle;
          }
      }},{
      hooks: {
          beforeValidate: function(page, options) {
                  page.urlTitle = utils.generateUrlTitle(page.title);
          }
   }

});

var User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    }
});

module.exports = {
    Page: Page,
    User: User
};
