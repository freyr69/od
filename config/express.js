
var moment = require('moment');

module.exports.express = {
    customMiddleware: function(app) {
        app.use(function(req, res, next) {
            res.locals.moment = moment;
            next();
        });
    }
};
