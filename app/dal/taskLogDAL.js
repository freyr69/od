/**
 * module dependencies
 */
var DbContext = require('../../db/dbContext');

/**
 * taskLogDAL class
 */
(function() {

    /**
     * Attributes
     */
    var dbContext = new DbContext();

    /**
     * Constructor.
     */
    function taskLogDAL() {

    }

    /**
     * get taskLog by id
     * @param  {Integer}   taskLogId
     * @param  {Function} callback
     */
    taskLogDAL.prototype.get = function(taskLogId, callback) {
        dbContext.taskLog.find(taskLogId).success(function(taskLog) {
            callback(taskLog);
        });
    };

    /**
     * get all taskLog
     * @param  {Function} callback
     */
    taskLogDAL.prototype.getAll = function(callback) {
        dbContext.taskLog.findAll({order: 'id DESC'}).success(function(taskLogs) {
            callback(taskLogs);
        });
    };

    /**
     * save taskLog
     * @param  {Object}   taskLog
     * @param  {Function} callback
     */
    taskLogDAL.prototype.save = function(taskLog, callback) {
        var taskLog = dbContext.taskLog.build(taskLog);
        taskLog.save().success(function(taskLog) {
            callback(taskLog);
        }).error(function(error) {
            callback({message: error});
        });
    };

    /**
     * edit a taskLog
     * @param  {Object}   taskLog
     * @param  {[type]}   attributes
     * @param  {Function} callback
     */
    taskLogDAL.prototype.update = function(taskLog, attributes, callback) {
        taskLog.updateAttributes(attributes).success(function(updatedtaskLog) {
            callback(updatedtaskLog);
        });
    };

    /**
     * delete an taskLog
     * @param  {Integer}   taskLogId
     * @param  {Function} callback
     */
    taskLogDAL.prototype.remove = function(taskLogId, callback) {
        dbContext.taskLog.find(taskLogId).success(function(taskLog) {
            taskLog.destroy().success(function() {
                callback();
            });
        });
    };

    module.exports = taskLogDAL;
})();