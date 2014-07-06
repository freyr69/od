/**
 * module dependencies
 */
var DbContext = require('../../db/dbContext');

/**
 * orgasmLogDAL class
 */
(function() {

    /**
     * Attributes
     */
    var dbContext = new DbContext();

    /**
     * Constructor.
     */
    function orgasmLogDAL() {

    }

    /**
     * log an orgasm to the database
     * @param {Integer} type
     * @param {Function} callback
     */
    orgasmLogDAL.prototype.log = function(type, callback) {

        if (type === null) {
            type = 1;
        }

        var log = dbContext.orgasmLog.build({
            date: new Date(),
            type: type
        });
        log.save().success(function(arousal) {
            callback(log);
        }).error(function(error) {
            callback({message: error});
        });
    };


    orgasmLogDAL.prototype.getPreviousOrgasm = function(callback) {
        dbContext.orgasmLog.findAll({order: 'date DESC', limit: 1}).success(function(orgasmLogs) {
            var log = orgasmLogs[0];
            if (log) {
                callback(log);
            } else {
                callback(null);
            }
        }).error(function(error) {
            callback(null);
        });
    };


    orgasmLogDAL.prototype.getPreviousOrgasmDate = function(callback) {
        this.getPreviousOrgasm(function(log) {
            if (log === null) {
                callback(null);
            } else {
                if (log.date) {
                    callback(log.date);
                } else {
                    callback(null);
                }
            }

        });
    };


    orgasmLogDAL.prototype.getCount = function(start, end, callback) {
        dbContext.db.query('select count(*) as count from orgasmLogs where `date` between "' + start + '" and "' + end + '"' ).success(function(count) {
            callback(count);
        });
    };
    
    orgasmLogDAL.prototype.getAggregate = function(start, end, callback) {
        dbContext.db.query('select type, count(*) as count from orgasmLogs where `date` between "' + start + '" and "' + end + '" group by type' ).success(function(data) {
            callback(data);
        }).error(function(err) {
            console.log("error:", err);
            callback({});
        });
    };

    /**
     * get orgasmLog by id
     * @param  {Integer}   orgasmLogId
     * @param  {Function} callback
     */
    orgasmLogDAL.prototype.get = function(orgasmLogId, callback) {
        dbContext.orgasmLog.find(orgasmLogId).success(function(orgasmLog) {
            callback(orgasmLog);
        });
    };

    /**
     * get all orgasmLog
     * @param  {Function} callback
     */
    orgasmLogDAL.prototype.getAll = function(callback) {
        dbContext.orgasmLog.findAll({order: 'date DESC'}).success(function(orgasmLogs) {
            callback(orgasmLogs);
        });
    };

    /**
     * save orgasmLog
     * @param  {Object}   orgasmLog
     * @param  {Function} callback
     */
    orgasmLogDAL.prototype.save = function(orgasmLog, callback) {
        var orgasmLog = dbContext.orgasmLog.build(orgasmLog);
        orgasmLog.save().success(function(orgasmLog) {
            callback(orgasmLog);
        }).error(function(error) {
            callback({message: error});
        });
    };

    /**
     * edit a orgasmLog
     * @param  {Object}   orgasmLog
     * @param  {[type]}   attributes
     * @param  {Function} callback
     */
    orgasmLogDAL.prototype.update = function(orgasmLog, attributes, callback) {
        orgasmLog.updateAttributes(attributes).success(function(updatedorgasmLog) {
            callback(updatedorgasmLog);
        });
    };

    /**
     * delete an orgasmLog
     * @param  {Integer}   orgasmLogId
     * @param  {Function} callback
     */
    orgasmLogDAL.prototype.remove = function(orgasmLogId, callback) {
        dbContext.orgasmLog.find(orgasmLogId).success(function(orgasmLog) {
            orgasmLog.destroy().success(function() {
                callback();
            });
        });
    };

    module.exports = orgasmLogDAL;
})();