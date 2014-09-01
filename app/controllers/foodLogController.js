

/**
 * Module dependencies.
 */
var FoodLogDAL = require('../dal/foodLogDAL');
var FoodDAL = require('../dal/foodDAL');
var csrfFilters = require('../filters/csrfFilters');
var membershipFilters = require('../filters/membershipFilters');
var async = require('async');
var moment = require('moment-timezone');

/**
 * foodLogController class
 */
(function() {

    /**
     * Attributes.
     */
    var foodLogDAL = new FoodLogDAL();
    var foodDAL = new FoodDAL();

    /**
     * Constructor.
     * @param {app} - express app.
     */
    function FoodLogController(app) {
        this.routes(app);
    }

    /**
     * foodLogController routes.
     * @param {app} - express app.
     */
    FoodLogController.prototype.routes = function(app) {
        app.all('/foodLog*', membershipFilters.authorize, csrfFilters.csrf);

        app.get('/foodLog', csrfFilters.antiForgeryToken, this.index);
        app.post('/foodLog/create', this.create);
        app.get('/foodLog/delete/:id', csrfFilters.antiForgeryToken, this.delete);
        app.post('/foodLog/delete', this.destroy);
    };

    /**
     * [httpget]
     * FoodLogController index action.
     * @param {req} http request.
     * @param {res} http response.
     */
    FoodLogController.prototype.index = function(req, res) {
        var startDate = new Date();
        startDate.setHours(0, 0, 0, 0);
        var endDate = new Date();
        endDate.setHours(23, 59, 59, 999);

        var start = moment(startDate).utc().format('YYYY-MM-DD HH:mm:ss');
        var end = moment(endDate).utc().format('YYYY-MM-DD HH:mm:ss');

        async.parallel({
            foods: function(callback) {
                foodDAL.getAll(function(data) {
                    callback(null, data);
                });
            },
            foodLogs: function(callback) {
                foodLogDAL.getAllBetween(start, end, function(data) {
                    callback(null, data);
                });
            },
            points: function(callback) {
                foodLogDAL.countPoints(start, end, function(data) {
                    callback(null, data);
                });
            }
        }, function(err, results) {
            res.render('foodLog/index', {
                foodLogs: results.foodLogs,
                foods: results.foods,
                points: results.points[0].points
            });
        });
    };

    /**
     * [httppost]
     * foodLogController create post action.
     * @param {req} http request.
     * @param {res} http response.
     */
    FoodLogController.prototype.create = function(req, res) {
        var foodName = req.body.food;

        foodDAL.getByName(foodName, function(food) {
            foodLogDAL.addFood(food, function(data) {
                res.redirect('/foodLog', {});
            });
        });
    };

    /**
     * [httpget]
     * FoodLogController delete action.
     * @param {req} http request.
     * @param {res} http response.
     */
    FoodLogController.prototype.delete = function(req, res) {
        var foodLogId = req.params.id;
        foodLogDAL.get(foodLogId, function(foodLog) {
            res.render('foodLog/delete', {'foodLog': foodLog});
        });
    };

    /**
     * [httppost]
     * FoodLogController delete post action.
     * @param {req} http request.
     * @param {res} http response.
     */
    FoodLogController.prototype.destroy = function(req, res) {
        var foodLog = req.body.foodLog;
        foodLogDAL.remove(foodLog.id, function(data) {
            res.redirect('/foodLog', {});
        });
    };

    module.exports = FoodLogController;
})();