/**
 * module dependencies
 */
var DbContext = require('../../db/dbContext');

/**
 * punishmentLogDAL class
 */
(function() {

    /**
     * Attributes
     */
    var dbContext = new DbContext();

    /**
     * Constructor.
     */
    function punishmentLogDAL() {

    }

    /**
     * get punishmentLog by id
     * @param  {Integer}   punishmentLogId
     * @param  {Function} callback
     */
    punishmentLogDAL.prototype.get = function(punishmentLogId, callback) {
        dbContext.punishmentLog.find(punishmentLogId).success(function(punishmentLog) {
            callback(punishmentLog);
        });
    };

    /**
     * get all punishmentLog
     * @param  {Function} callback
     */
    punishmentLogDAL.prototype.getAll = function(callback) {
        dbContext.punishmentLog.findAll({order: 'id DESC'}).success(function(punishmentLogs) {
            callback(punishmentLogs);
        });
    };

    /**
     * save punishmentLog
     * @param  {Object}   punishmentLog
     * @param  {Function} callback
     */
    punishmentLogDAL.prototype.save = function(punishmentLog, callback) {
        var punishmentLog = dbContext.punishmentLog.build(punishmentLog);
        punishmentLog.save().success(function(punishmentLog) {
            callback(punishmentLog);
        }).error(function(error) {
            callback({message: error});
        });
    };

    /**
     * edit a punishmentLog
     * @param  {Object}   punishmentLog
     * @param  {[type]}   attributes
     * @param  {Function} callback
     */
    punishmentLogDAL.prototype.update = function(punishmentLog, attributes, callback) {
        punishmentLog.updateAttributes(attributes).success(function(updatedpunishmentLog) {
            callback(updatedpunishmentLog);
        });
    };

    /**
     * delete an punishmentLog
     * @param  {Integer}   punishmentLogId
     * @param  {Function} callback
     */
    punishmentLogDAL.prototype.remove = function(punishmentLogId, callback) {
        dbContext.punishmentLog.find(punishmentLogId).success(function(punishmentLog) {
            punishmentLog.destroy().success(function() {
                callback();
            });
        });
    };

    module.exports = punishmentLogDAL;
})();