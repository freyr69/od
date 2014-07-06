/**
 * module dependencies
 */
var DbContext = require('../../db/dbContext');

/**
 * teaseLogDAL class
 */
(function() {

    /**
     * Attributes
     */
    var dbContext = new DbContext();

    /**
     * Constructor.
     */
    function teaseLogDAL() {

    }

    /**
     * get teaseLog by id
     * @param  {Integer}   teaseLogId
     * @param  {Function} callback
     */
    teaseLogDAL.prototype.get = function(teaseLogId, callback) {
        dbContext.teaseLog.find(teaseLogId).success(function(teaseLog) {
            callback(teaseLog);
        });
    };

    /**
     * get all teaseLog
     * @param  {Function} callback
     */
    teaseLogDAL.prototype.getAll = function(callback) {
        dbContext.teaseLog.findAll({order: 'assigned DESC'}).success(function(teaseLogs) {
            callback(teaseLogs);
        });
    };

    /**
     * save teaseLog
     * @param  {Object}   teaseLog
     * @param  {Function} callback
     */
    teaseLogDAL.prototype.save = function(teaseLog, callback) {
        teaseLog.inChastity = (teaseLog.inChastity == 1) ? true : false;

        var teaseLog = dbContext.teaseLog.build(teaseLog);
        teaseLog.save().success(function(teaseLog) {
            callback(teaseLog);
        }).error(function(error) {
            callback({message: error});
        });
    };

    /**
     * edit a teaseLog
     * @param  {Object}   teaseLog
     * @param  {[type]}   attributes
     * @param  {Function} callback
     */
    teaseLogDAL.prototype.update = function(teaseLog, attributes, callback) {
        attributes.inChastity = (attributes.inChastity == 1) ? true : false;

        teaseLog.updateAttributes(attributes).success(function(updatedteaseLog) {
            callback(updatedteaseLog);
        });
    };

    /**
     * delete an teaseLog
     * @param  {Integer}   teaseLogId
     * @param  {Function} callback
     */
    teaseLogDAL.prototype.remove = function(teaseLogId, callback) {
        dbContext.teaseLog.find(teaseLogId).success(function(teaseLog) {
            teaseLog.destroy().success(function() {
                callback();
            });
        });
    };

    module.exports = teaseLogDAL;
})();