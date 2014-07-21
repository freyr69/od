/**
 * module dependencies
 */
var DbContext = require('../../db/dbContext');

/**
 * exerciseLogDAL class
 */
(function() {

    /**
     * Attributes
     */
    var dbContext = new DbContext();

    /**
     * Constructor.
     */
    function exerciseLogDAL() {

    }

    /**
     * get exerciseLog by id
     * @param  {Integer}   exerciseLogId
     * @param  {Function} callback
     */
    exerciseLogDAL.prototype.get = function(exerciseLogId, callback) {
        dbContext.exerciseLog.find(exerciseLogId).success(function(exerciseLog) {
            callback(exerciseLog);
        });
    };

    /**
     * get all exerciseLog
     * @param  {Function} callback
     */
    exerciseLogDAL.prototype.getAll = function(callback) {
        dbContext.exerciseLog.findAll({order: 'id DESC'}).success(function(exerciseLogs) {
            callback(exerciseLogs);
        });
    };

    /**
     * save exerciseLog
     * @param  {Object}   exerciseLog
     * @param  {Function} callback
     */
    exerciseLogDAL.prototype.save = function(exerciseLog, callback) {
        var exerciseLog = dbContext.exerciseLog.build(exerciseLog);
        exerciseLog.save().success(function(exerciseLog) {
            callback(exerciseLog);
        }).error(function(error) {
            callback({message: error});
        });
    };

    /**
     * edit a exerciseLog
     * @param  {Object}   exerciseLog
     * @param  {[type]}   attributes
     * @param  {Function} callback
     */
    exerciseLogDAL.prototype.update = function(exerciseLog, attributes, callback) {
        exerciseLog.updateAttributes(attributes).success(function(updatedexerciseLog) {
            callback(updatedexerciseLog);
        });
    };

    /**
     * delete an exerciseLog
     * @param  {Integer}   exerciseLogId
     * @param  {Function} callback
     */
    exerciseLogDAL.prototype.remove = function(exerciseLogId, callback) {
        dbContext.exerciseLog.find(exerciseLogId).success(function(exerciseLog) {
            exerciseLog.destroy().success(function() {
                callback();
            });
        });
    };

    module.exports = exerciseLogDAL;
})();