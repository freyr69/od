/**
 * module dependencies
 */
var DbContext = require('../../db/dbContext');

/**
 * punishmentDAL class
 */
(function() {

    /**
     * Attributes
     */
    var dbContext = new DbContext();

    /**
     * Constructor.
     */
    function punishmentDAL() {

    }


    punishmentDAL.prototype.getRandom = function(callback) {
        console.log("getting random punishment");
        console.log(dbContext.db);
        dbContext
                .db
                .query('SELECT * FROM `punishments` WHERE id >= (SELECT FLOOR( MAX(id) * RAND()) FROM `punishments` ) ORDER BY id LIMIT 1;', dbContext.punishment)
                .success(function(punishments) {
                    console.log(punishments);
                    callback(punishments);
                });
    };

    /**
     * get punishment by id
     * @param  {Integer}   punishmentId
     * @param  {Function} callback
     */
    punishmentDAL.prototype.get = function(punishmentId, callback) {
        dbContext.punishment.find(punishmentId).success(function(punishment) {
            callback(punishment);
        });
    };

    /**
     * get all punishment
     * @param  {Function} callback
     */
    punishmentDAL.prototype.getAll = function(callback) {
        dbContext.punishment.findAll({order: 'id DESC'}).success(function(punishments) {
            callback(punishments);
        });
    };

    /**
     * save punishment
     * @param  {Object}   punishment
     * @param  {Function} callback
     */
    punishmentDAL.prototype.save = function(punishment, callback) {
        var punishment = dbContext.punishment.build(punishment);
        punishment.save().success(function(punishment) {
            callback(punishment);
        }).error(function(error) {
            callback({message: error});
        });
    };

    /**
     * edit a punishment
     * @param  {Object}   punishment
     * @param  {[type]}   attributes
     * @param  {Function} callback
     */
    punishmentDAL.prototype.update = function(punishment, attributes, callback) {
        punishment.updateAttributes(attributes).success(function(updatedpunishment) {
            callback(updatedpunishment);
        });
    };

    /**
     * delete an punishment
     * @param  {Integer}   punishmentId
     * @param  {Function} callback
     */
    punishmentDAL.prototype.remove = function(punishmentId, callback) {
        dbContext.punishment.find(punishmentId).success(function(punishment) {
            punishment.destroy().success(function() {
                callback();
            });
        });
    };

    module.exports = punishmentDAL;
})();