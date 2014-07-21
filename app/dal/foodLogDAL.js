/**
 * module dependencies
 */
var DbContext = require('../../db/dbContext');

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
        dbContext.foodLog.findAll({order: 'id DESC'}).success(function(foodLogs) {
            callback(foodLogs);
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