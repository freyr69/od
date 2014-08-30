/**
 * module dependencies
 */
var DbContext = require('../../db/dbContext');
var moment = require('moment-timezone');

/**
 * foodLogDAL class
 */
(function() {

    /**
     * Attributes
     */
    var dbContext = new DbContext();

    /**
     * Constructor.
     */
    function foodLogDAL() {

    }

    /**
     * get foodLog by id
     * @param  {Integer}   foodLogId
     * @param  {Function} callback
     */
    foodLogDAL.prototype.get = function(foodLogId, callback) {
        dbContext.foodLog.find(foodLogId).success(function(foodLog) {
            callback(foodLog);
        });
    };

    /**
     * get all foodLog
     * @param  {Function} callback
     */
    foodLogDAL.prototype.getAll = function(callback) {
        dbContext.foodLog.findAll({order: 'id DESC', include: [dbContext.food]}).success(function(foodLogs) {
            callback(foodLogs);
        });
    };

    foodLogDAL.prototype.getAllBetween = function(start, end, callback) {
        dbContext.foodLog.findAll({order: 'id DESC', where: ['`date` between "' + start + '" and "' + end + '"'], include: [dbContext.food]}).success(function(foodLogs) {
            callback(foodLogs);
        });
    };

    foodLogDAL.prototype.countPoints = function(start, end, callback) {
        dbContext.db.query('select sum(foods.points) as points from foods, foodLogs where foods.id = foodLogs.foodId and foodLogs.`date` between "' + start + '" and "' + end + '"').success(function(points) {
            callback(points);
        });
    };

    foodLogDAL.prototype.addFood = function(food, callback) {
        dbContext.foodLog.create({
            date: moment.utc()
        }).success(function(foodLog) {
            food.addFoodLog(foodLog).success(function() {
                callback(foodLog);
            });
        }).error(function(error) {
            callback({message: error});
        });
    };

    /**
     * save foodLog
     * @param  {Object}   foodLog
     * @param  {Function} callback
     */
    foodLogDAL.prototype.save = function(foodLog, callback) {
        var foodLog = dbContext.foodLog.build(foodLog);
        foodLog.save().success(function(foodLog) {
            callback(foodLog);
        }).error(function(error) {
            callback({message: error});
        });
    };

    /**
     * edit a foodLog
     * @param  {Object}   foodLog
     * @param  {[type]}   attributes
     * @param  {Function} callback
     */
    foodLogDAL.prototype.update = function(foodLog, attributes, callback) {
        foodLog.updateAttributes(attributes).success(function(updatedfoodLog) {
            callback(updatedfoodLog);
        });
    };

    /**
     * delete an foodLog
     * @param  {Integer}   foodLogId
     * @param  {Function} callback
     */
    foodLogDAL.prototype.remove = function(foodLogId, callback) {
        dbContext.foodLog.find(foodLogId).success(function(foodLog) {
            foodLog.destroy().success(function() {
                callback();
            });
        });
    };

    module.exports = foodLogDAL;
})();