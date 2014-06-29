/**
 * module dependencies
 */
var DbContext = require('../../db/dbContext');
var OrgasmLogDAL = require('./orgasmLogDAL');
var moment = require('moment');
var php = require('phpjs');
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
                    callback(null, data);
                });
            } else {
                //console.log("found a orgasm:  ", orgasms[0]);
                console.log("found an orgasm...");
                callback(null, orgasms[0]);
            }
        });
    };


    orgasmDAL.prototype.getNextOrgasmDate = function(callback) {
        this.getNextOrgasm(function(err, data) {
            //console.log("next orgasm date:  ", data.nextOrgasmDate);
            callback(null, data.nextOrgasmDate);
        });
    };


    orgasmDAL.prototype.getPreviousOrgasm = function(callback) {
        orgasmLogDAL.getPreviousOrgasm(function(data) {
            //console.log("Previous orgasm:  ", data);
            callback(null, data);
        });
    };


    orgasmDAL.prototype.getPreviousOrgasmDate = function(callback) {
        orgasmLogDAL.getPreviousOrgasmDate(function(data) {
            //console.log("Previous orgasm date:  ", data);
            callback(null, data);
        });
    };


    orgasmDAL.prototype.updateOrgasmDate = function(type, callback) {
        var that = this;
        async.parallel({
            penalty: function(callback) {
                //callback(null, that.getOrgasmPenalty(type));
                that.getOrgasmPenalty(type, callback);
            },
            nextDate: function(callback) {
                that.getNextOrgasm(callback);
            }
        }, function(error, results) {
            //console.log("updateOrgasmDate::results:  ", results);
            var nn = moment(results.nextDate.nextOrgasmDate).unix() + (results.penalty * 24 * 60 * 60);
            var nextOD = moment(nn * 1000);

            //console.log("Prev NextDate:  ", results.nextDate);
            //console.log("New NextDate:  ", nextOD.format());

            that.update(results.nextDate, {nextOrgasmDate: nextOD.format()}, function(data) {
                //console.log("New next orgasm date: ", data);
                var ndate = data.nextOrgasmDate;
                callback(null, ndate);
            });
        });
    };


    orgasmDAL.prototype.getOrgasmPenalty = function(type, callback) {
        type = parseInt(type);
        if (type === 2) { // Wet Dream
            callback(null, 0);
        } else if (type === 3) { // Sex
            this.getSexPenalty(callback);
        } else if (type === 4) { // Prostate Massage
            callback(null, 0);
        } else { // must be Masturbation
            callback(null, this.getMasturbationPenalty());
        }
    };

    orgasmDAL.prototype.getSexPenalty = function(next) {
        var that = this;
        async.parallel({
            prev: function(callback) {
                that.getPreviousOrgasmDate(callback);
            },
            next: function(callback) {
                that.getNextOrgasmDate(callback);
            }
        }, function(error, results) {
            var prev = moment(results.prev);
            var nnext = moment(results.next);
            var now = moment();
            var offset = php.rand(500, 1500) / 1000;

            var dt = nnext.diff(prev, 'days');
            var dc = now.diff(prev, 'days');
            var dr = nnext.diff(now, 'days');

            var penalty = dt - (dt * Math.sin((3.14 * Math.abs(dc - dr)) / dt));
            penalty = Math.floor(penalty * offset);
            next(null, penalty);
        });
    };


    orgasmDAL.prototype.getMasturbationPenalty = function() {
        var min = 14;
        var max = 60;

        var first = php.rand(min, max);
        var offset = php.rand(100, 3000);

        var penalty = first * (offset / 1000);
        return Math.floor(penalty);
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

    module.exports = orgasmDAL;
})();