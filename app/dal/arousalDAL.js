/**
 * module dependencies
 */
var DbContext = require('../../db/dbContext');

/**
 * arousalDAL class
 */
(function() {

    /**
     * Attributes
     */
    var dbContext = new DbContext();

    /**
     * Constructor.
     */
    function arousalDAL() {

    }

    /**
     * get the last logged arousal log
     * @param {Function} callback
     */
    arousalDAL.prototype.getLatest = function(callback) {
        dbContext.arousal.findAll({order: 'date DESC', limit: 1}).success(function(arousals) {
            var arousal = arousals[0];
            if (arousal === undefined) {
                arousal = {
                    level: 1,
                    date: new Date()
                };
            }
            callback(arousal);
        }).error(function(error) {
            callback(null);
        });
    };

    arousalDAL.prototype.logLevel = function(level, callback) {

        if (level === null) {
            level = 1;
        }

        if (level < 1) {
            level = 1;
        }

        if (level > 5) {
            level = 5;
        }

        var arousal = dbContext.arousal.build({
            date: new Date(),
            level: level
        });
        arousal.save().success(function(arousal) {
            callback(arousal);
        }).error(function(error) {
            callback({message: error});
        });
    };
    
    arousalDAL.prototype.getAll = function(callback) {
        dbContext.arousal.findAll({order: 'date DESC'}).success(function(data) {
            callback(data);
        });
    };

    module.exports = arousalDAL;
})();