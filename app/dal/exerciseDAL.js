/**
 * module dependencies
 */
var DbContext = require('../../db/dbContext');

/**
 * exerciseDAL class
 */
(function() {

    /**
     * Attributes
     */
    var dbContext = new DbContext();

    /**
     * Constructor.
     */
    function exerciseDAL() {

    }

    /**
     * get exercise by id
     * @param  {Integer}   exerciseId
     * @param  {Function} callback
     */
    exerciseDAL.prototype.get = function(exerciseId, callback) {
        dbContext.exercise.find(exerciseId).success(function(exercise) {
            callback(exercise);
        });
    };

    /**
     * get all exercise
     * @param  {Function} callback
     */
    exerciseDAL.prototype.getAll = function(callback) {
        dbContext.exercise.findAll({order: 'id DESC'}).success(function(exercises) {
            callback(exercises);
        });
    };

    /**
     * save exercise
     * @param  {Object}   exercise
     * @param  {Function} callback
     */
    exerciseDAL.prototype.save = function(exercise, callback) {
        var exercise = dbContext.exercise.build(exercise);
        exercise.save().success(function(exercise) {
            callback(exercise);
        }).error(function(error) {
            callback({message: error});
        });
    };

    /**
     * edit a exercise
     * @param  {Object}   exercise
     * @param  {[type]}   attributes
     * @param  {Function} callback
     */
    exerciseDAL.prototype.update = function(exercise, attributes, callback) {
        exercise.updateAttributes(attributes).success(function(updatedexercise) {
            callback(updatedexercise);
        });
    };

    /**
     * delete an exercise
     * @param  {Integer}   exerciseId
     * @param  {Function} callback
     */
    exerciseDAL.prototype.remove = function(exerciseId, callback) {
        dbContext.exercise.find(exerciseId).success(function(exercise) {
            exercise.destroy().success(function() {
                callback();
            });
        });
    };

    module.exports = exerciseDAL;
})();