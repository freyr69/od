/**
 * module dependencies
 */
var DbContext = require('../../db/dbContext');

/**
 * taskDAL class
 */
(function() {

    /**
     * Attributes
     */
    var dbContext = new DbContext();

    /**
     * Constructor.
     */
    function taskDAL() {

    }

    /**
     * get task by id
     * @param  {Integer}   taskId
     * @param  {Function} callback
     */
    taskDAL.prototype.get = function(taskId, callback) {
        dbContext.task.find(taskId).success(function(task) {
            callback(task);
        });
    };

    /**
     * get all task
     * @param  {Function} callback
     */
    taskDAL.prototype.getAll = function(callback) {
        dbContext.task.findAll({order: 'id DESC'}).success(function(tasks) {
            callback(tasks);
        });
    };

    /**
     * save task
     * @param  {Object}   task
     * @param  {Function} callback
     */
    taskDAL.prototype.save = function(task, callback) {
        var task = dbContext.task.build(task);
        task.save().success(function(task) {
            callback(task);
        }).error(function(error) {
            callback({message: error});
        });
    };

    /**
     * edit a task
     * @param  {Object}   task
     * @param  {[type]}   attributes
     * @param  {Function} callback
     */
    taskDAL.prototype.update = function(task, attributes, callback) {
        task.updateAttributes(attributes).success(function(updatedtask) {
            callback(updatedtask);
        });
    };

    /**
     * delete an task
     * @param  {Integer}   taskId
     * @param  {Function} callback
     */
    taskDAL.prototype.remove = function(taskId, callback) {
        dbContext.task.find(taskId).success(function(task) {
            task.destroy().success(function() {
                callback();
            });
        });
    };

    module.exports = taskDAL;
})();