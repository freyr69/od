/**
 * module dependencies
 */
var DbContext = require('../../db/dbContext');

/**
 * chastityLogDAL class
 */
(function() {

    /**
     * Attributes
     */
    var dbContext = new DbContext();

    /**
     * Constructor.
     */
    function chastityLogDAL() {

    }


    chastityLogDAL.prototype.getLatest = function(callback) {
        dbContext.chastityLog.findAll({order: 'start DESC', limit: 1}).success(function(logs) {
            var chastity = logs[0];
            if (chastity === undefined) {
                chastity = {
                    start: new Date(),
                    end: new Date()
                };
            }
            callback(chastity);
        }).error(function(error) {
            callback(null);
        });
    };

    chastityLogDAL.prototype.startSession = function(callback) {
        var chastityLog = dbContext.chastityLog.build({
            start: new Date()
        });
        chastityLog.save().success(function(chastityLog) {
            callback(chastityLog);
        }).error(function(error) {
            callback({message: error});
        });
    };

    chastityLogDAL.prototype.endSession = function(callback) {
        this.getLatest(function(log) {
            if (log.end === null) {
                log.end = new Date();
                log.save().success(function(chastityLog) {
                    callback(chastityLog);
                }).error(function(error) {
                    callback({message: error});
                });
            } else {
                callback();
            }
        });
    };


    chastityLogDAL.prototype.getAll = function(callback) {
        dbContext.chastityLog.findAll({order: 'start DESC'}).success(function(data) {
            callback(data);
        });
    };
    
    
    chastityLogDAL.prototype.getMaxDuration = function(callback) {
        dbContext.db.query('SELECT max(TIMESTAMPDIFF(SECOND, start, end)) as max from chastityLogs' ).success(function(data) {
            callback(data[0].max);
        });
    };
    
    chastityLogDAL.prototype.getMinDuration = function(callback) {
        dbContext.db.query('SELECT min(TIMESTAMPDIFF(SECOND, start, end)) as min from chastityLogs' ).success(function(data) {
            callback(data[0].min);
        });
    };
    
    chastityLogDAL.prototype.getTotalDuration = function(callback) {
        dbContext.db.query('SELECT sum(TIMESTAMPDIFF(SECOND, start, end)) as total from chastityLogs' ).success(function(data) {
            callback(data[0].total);
        });
    };

    module.exports = chastityLogDAL;
})();