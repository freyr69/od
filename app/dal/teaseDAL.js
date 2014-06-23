/**
 * module dependencies
 */
var DbContext = require('../../db/dbContext');

/**
 * teaseDAL class
 */
(function() {

    /**
     * Attributes
     */
    var dbContext = new DbContext();

    /**
     * Constructor.
     */
    function teaseDAL() {

    }

    /**
     * get tease by id
     * @param  {Integer}   teaseId
     * @param  {Function} callback
     */
    teaseDAL.prototype.get = function(teaseId, callback) {
        dbContext.tease.find(teaseId).success(function(tease) {
            callback(tease);
        });
    };

    /**
     * get all tease
     * @param  {Function} callback
     */
    teaseDAL.prototype.getAll = function(callback) {
        dbContext.tease.findAll({order: 'id DESC'}).success(function(teases) {
            callback(teases);
        });
    };

    /**
     * save tease
     * @param  {Object}   tease
     * @param  {Function} callback
     */
    teaseDAL.prototype.save = function(tease, callback) {
        tease.allowChastity = (tease.allowChastity == 1) ? true : false;

        var tease = dbContext.tease.build(tease);
        tease.save().success(function(tease) {
            callback(tease);
        }).error(function(error) {
            callback({message: error});
        });
    };

    /**
     * edit a tease
     * @param  {Object}   tease
     * @param  {[type]}   attributes
     * @param  {Function} callback
     */
    teaseDAL.prototype.update = function(tease, attributes, callback) {
        attributes.allowChastity = (attributes.allowChastity == 1) ? true : false;

        tease.updateAttributes(attributes).success(function(updatedtease) {
            callback(updatedtease);
        });
    };

    /**
     * delete an tease
     * @param  {Integer}   teaseId
     * @param  {Function} callback
     */
    teaseDAL.prototype.remove = function(teaseId, callback) {
        dbContext.tease.find(teaseId).success(function(tease) {
            tease.destroy().success(function() {
                callback();
            });
        });
    };

    module.exports = teaseDAL;
})();