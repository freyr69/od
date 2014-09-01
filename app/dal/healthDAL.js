/**
 * module dependencies
 */
var DbContext = require('../../db/dbContext');
var moment = require('moment-timezone');

/**
 * healthDAL class
 */
(function() {

    /**
     * Attributes
     */
    var dbContext = new DbContext();

    /**
     * Constructor.
     */
    function healthDAL() {

    }

    /**
     * get the last logged arousal log
     * @param {Function} callback
     */
    healthDAL.prototype.getLatest = function(callback) {
        dbContext.health.findAll({order: 'date DESC', limit: 1}).success(function(healths) {
            callback(healths[0]);
        }).error(function(error) {
            callback(null);
        });
    };

    healthDAL.prototype.logHealth = function(health, callback) {
        var healthLog = dbContext.health.build(health);
        healthLog.date = moment.utc();
        healthLog.save().success(function(healthLog) {
            callback(healthLog);
        }).error(function(error) {
            callback({message: error});
        });
    };

    healthDAL.prototype.getAll = function(callback) {
        dbContext.health.findAll({order: 'date DESC'}).success(function(data) {
            callback(data);
        });
    };

    module.exports = healthDAL;
})();