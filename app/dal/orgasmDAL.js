/**
 * module dependencies
 */
var DbContext = require('../../db/dbContext');
var OrgasmLogDAL = require('./orgasmLogDAL');
var moment = require('moment');
var rand = require('rand');
var async = require('async');

/**
 * orgasmDAL class
 */
(function() {

    /**
     * Attributes
     */
    var dbContext = new DbContext();
    var orgasmLogDAL = new OrgasmLogDAL();

    /**
     * Constructor.
     */
    function orgasmDAL() {

    }

    orgasmDAL.prototype.getNextOrgasm = function(callback) {
        var nextDate = moment().add('days', 30).format();

        var that = this;
        dbContext.orgasm.findAll({limit: 1}).success(function(orgasms) {
            if (orgasms.length === 0) {
                console.log("creating new orgasm date...");
                that.save({
                    nextOrgasmDate: nextDate
                }, function(data) {
                    callback(data);
                });
            } else {
                console.log("found a orgasm:  ", orgasms[0]);
                callback(orgasms[0]);
            }
        });
    };


    orgasmDAL.prototype.getNextOrgasmDate = function(callback) {
        this.getNextOrgasm(function(data) {
            console.log("next orgasm date = ", data.nextOrgasmDate);
            callback(data.nextOrgasmDate);
        });
    };


    orgasmDAL.prototype.getPreviousOrgasm = function(callback) {
        orgasmLogDAL.getPreviousOrgasm(function(data) {
            console.log("Previous orgasm:  ", data);
            callback(data);
        });
    };


    orgasmDAL.prototype.getPreviousOrgasmDate = function(callback) {
        orgasmLogDAL.getPreviousOrgasmDate(function(data) {
            console.log("Previous orgasm date:  ", data);
            callback(data);
        });
    };


    orgasmDAL.prototype.updateOrgasmDate = function(type, callback) {
        var that = this;
        async.parallel({
            penalty: function(callback) {
                callback(that.getOrgasmPenalty(type));
            },
            nextDate: function(callback) {
                that.getNextOrgasm(callback);
            }
        }, function(error, results) {
            var nn = moment(result.nextDate.nextOrgasmDate).unix() + (results.penalty * 24 * 60 * 60);
            var nextOD = moment(nn * 1000);

            console.log("NextDate:  ", results.nextDate);

            that.update(results.nextDate, {nextOrgasmDate: nextOD.format()}, function(data) {
                console.log("New next orgasm date: ", ndate);
                callback(ndate);
            });
        });
    };


    orgasmDAL.prototype.getOrgasmPenalty = function(type) {
        if (type == 2) { // Wet Dream
            return 0;
        } else if (type == 3) { // Sex
            return this.getSexPenalty();
        } else if (type == 4) { // Prostate Massage
            return 0;
        } else { // must be Masturbation
            return this.getMasturbationPenalty();
        }
    }

    orgasmDAL.prototype.getSexPenalty = function() {
        var that = this;
        async.parallel({
            prev: function(callback) {
                that.getPreviousOrgasmDate(callback);
            },
            next: function(callback) {
                that.getNextOrgasmDate(callback);
            },
            offset: function(callback) {
                var d = rand.int(500, 1500);
                callback(d);
            }
        }, function(error, results) {
            var prev = moment(results.prev);
            var nnext = moment(results.next);
            var now = moment();
            var offset = results.offset / 1000;

            var dt = nnext.diff(prev, 'days');
            var dc = now.diff(prev, 'days');
            var dr = nnext.diff(now, 'days');

            var penalty = dt - (dt * Math.sin((3.14 * Math.abs(dc - dr)) / dt));
            return Math.floor(penalty * offset);
        });
    };


    orgasmDAL.prototype.getMasturbationPenalty = function() {
        var min = 14;
        var max = 60;

        var first = rand.int(min, max);
        var offset = rand.int(100, 3000);

        var penalty = first * (offset / 1000);
        return Math.floor(penalty);
    };


    /**
     * get orgasm by id
     * @param  {Integer}   orgasmId
     * @param  {Function} callback
     */
    orgasmDAL.prototype.get = function(orgasmId, callback) {
        dbContext.orgasm.find(orgasmId).success(function(orgasm) {
            callback(orgasm);
        });
    };

    /**
     * get all orgasm
     * @param  {Function} callback
     */
    orgasmDAL.prototype.getAll = function(callback) {
        dbContext.orgasm.findAll({order: 'id DESC'}).success(function(orgasms) {
            callback(orgasms);
        });
    };

    /**
     * save orgasm
     * @param  {Object}   orgasm
     * @param  {Function} callback
     */
    orgasmDAL.prototype.save = function(orgasm, callback) {
        var orgasm = dbContext.orgasm.build(orgasm);
        orgasm.save().success(function(orgasm) {
            callback(orgasm);
        }).error(function(error) {
            callback({message: error});
        });
    };

    /**
     * edit a orgasm
     * @param  {Object}   orgasm
     * @param  {[type]}   attributes
     * @param  {Function} callback
     */
    orgasmDAL.prototype.update = function(orgasm, attributes, callback) {
        orgasm.updateAttributes(attributes).success(function(updatedorgasm) {
            callback(updatedorgasm);
        });
    };

    /**
     * delete an orgasm
     * @param  {Integer}   orgasmId
     * @param  {Function} callback
     */
    orgasmDAL.prototype.remove = function(orgasmId, callback) {
        dbContext.orgasm.find(orgasmId).success(function(orgasm) {
            orgasm.destroy().success(function() {
                callback();
            });
        });
    };

    module.exports = orgasmDAL;
})();