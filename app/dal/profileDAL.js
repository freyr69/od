/**
 * module dependencies
 */
var DbContext = require('../../db/dbContext');
var async = require('async');
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
    function profileDAL() {

    }

    profileDAL.prototype.get = function(user, callback) {
        dbContext.variable.findAll({'userId': user.id}).success(function(variables) {
            
            var profile = {};
            variables.forEach(function(variable) {
                console.log("variable:  ", variable);
                profile[variable.name] = variable.value;
            });
            console.log("profile = ", profile);
            callback(profile);
        });
    };

    profileDAL.prototype.save = function(user, profile, callback) {
        var that = this;
        async.forEach(Object.keys(profile), function(prop, cb) {
            that.updateVariable(user, prop, profile[prop], cb);
        }, function(err) {
            callback(profile);
        });
    };

    profileDAL.prototype.getVariable = function(user, name, callback) {
        dbContext.variable.find({name: name, 'userId':user.id}).success(function(punishment) {
            callback(punishment);
        });
    };

    profileDAL.prototype.updateVariable = function(user, name, value, callback) {
        dbContext.variable.findOrCreate({name: name, 'userId': user.id}, {value: value})
                .success(function(variable, created) {
                    if (created) {
                        callback(variable);
                    } else {
                        variable.updateAttributes({
                            value: value
                        }).success(function(updatedVariable) {
                            callback(updatedVariable);
                        });
                    }
                })
                .error(function(error) {
                    callback({message: error});
                });

    };


    module.exports = profileDAL;
})();

