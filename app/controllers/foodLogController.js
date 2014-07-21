

/**
 * Module dependencies.
 */
var FoodLogDAL = require('../dal/foodLogDAL');
var csrfFilters = require('../filters/csrfFilters');

/**
 * foodLogController class
 */
(function() {

    /**
     * Attributes.
     */
    var foodLogDAL = new FoodLogDAL();

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
        app.all('/foodLog*', csrfFilters.csrf);

        app.get('/foodLog', this.index);
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
        foodLogDAL.getAll(function(foodLogs) {
            res.render('foodLog/index', {'foodLogs': foodLogs});
        });
    };

    /**
     * [httppost]
     * foodLogController create post action.
     * @param {req} http request.
     * @param {res} http response.
     */
    FoodLogController.prototype.create = function(req, res) {
        var foodLog = req.body.foodLog;

        foodLog.date = new Date(foodLog.date.year, foodLog.date.month, foodLog.date.day);
        foodLogDAL.save(foodLog, function(data) {
            res.redirect('/foodLog');
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
            res.redirect('/foodLog');
        });
    };

    module.exports = FoodLogController;
})();