/**
 * module dependencies
 */
var DbContext = require('../../db/dbContext');

/**
 * foodDAL class
 */
(function() {

    /**
     * Attributes
     */
    var dbContext = new DbContext();

    /**
     * Constructor.
     */
    function foodDAL() {

    }

    /**
     * get food by id
     * @param  {Integer}   foodId
     * @param  {Function} callback
     */
    foodDAL.prototype.get = function(foodId, callback) {
        dbContext.food.find(foodId).success(function(food) {
            callback(food);
        });
    };

    /**
     * get all food
     * @param  {Function} callback
     */
    foodDAL.prototype.getAll = function(callback) {
        dbContext.food.findAll({order: 'title ASC'}).success(function(foods) {
            callback(foods);
        });
    };

    /**
     * save food
     * @param  {Object}   food
     * @param  {Function} callback
     */
    foodDAL.prototype.save = function(food, callback) {
        var food = dbContext.food.build(food);
        food.save().success(function(food) {
            callback(food);
        }).error(function(error) {
            callback({message: error});
        });
    };

    /**
     * edit a food
     * @param  {Object}   food
     * @param  {[type]}   attributes
     * @param  {Function} callback
     */
    foodDAL.prototype.update = function(food, attributes, callback) {
        food.updateAttributes(attributes).success(function(updatedfood) {
            callback(updatedfood);
        });
    };

    /**
     * delete an food
     * @param  {Integer}   foodId
     * @param  {Function} callback
     */
    foodDAL.prototype.remove = function(foodId, callback) {
        dbContext.food.find(foodId).success(function(food) {
            food.destroy().success(function() {
                callback();
            });
        });
    };

    module.exports = foodDAL;
})();