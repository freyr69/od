var async = require('async');
var moment = require('moment');

exports.getNextOrgasm = function(next) {
    var nextDate = moment().add('days', 30).format();
    Orgasm.find().limit(1).exec(function(err, orgasms) {
        if (err) {
            sails.log.error("error getting orgasm", err);
            next(err, null);
        } else {

            if (orgasms.length === 0) {
                Orgasm.create({
                    nextOrgasmDate: nextDate
                }).done(function(err, orgasm) {
                    if (err) {
                        sails.log.warn(err);
                        //return console.log(err);
                        next(err, null);
                    } else {
                        sails.log.warn("Orgasm was initialized", orgasm);
                        next(null, nextDate);
                    }
                });
            } else {
                sails.log.info("orgasm:  ", orgasms);
                nextDate = orgasms[0];
                next(null, nextDate);
            }
        }

    });
};

exports.getNextOrgasmDate = function(next) {
    OrgasmService.getNextOrgasm(function(err, data) {
        next(err, data.nextOrgasmDate);
    });
};

exports.getPreviousOrgasmDate = function(next) {
    var lastDate = null;
    OrgasmLog.find({
        sort: 'date DESC',
        limit: 1
    }).exec(function(err, odate) {
        if (err) {
            sails.log.warn(err);
            next(err, null);
        } else {
            sails.log.info("last orgasm:", odate);
            if (odate.length === 0) {
                next(null, new Date());
            } else {
                lastDate = odate[0].date;
                next(null, lastDate);
            }
        }
    });
};

exports.logOrgasm = function(type, next) {
    OrgasmLog.create({
        type: type,
        date: moment().format()
    }).done(function(err, olog) {
        if (err) {
            sails.log.warn(err);
            next(err);
        } else {
            next(null, olog);
            //req.flash.message("Orgasm log was created for type " + type);
            //console.log("Orgasm log was created for type " + type + ":  ", olog);
        }
    });
};

exports.updateOrgasmDate = function(type, next) {
    async.parallel({
        penalty: function(callback) {
            OrgasmService.getOrgasmPenalty(type, callback);
        },
        nextDate: function(callback) {
            OrgasmService.getNextOrgasm(callback);
        }
    }, function(error, results) {
        var nn = moment(results.nextDate.nextOrgasmDate).unix() + (results.penalty * 24 * 60 * 60);
        var nextOD = moment(nn * 1000);

        sails.log.info("NextDate:  ", results.nextDate);
        
        Orgasm.update({id: results.nextDate.id}, {nextOrgasmDate: nextOD.format()}, function(err, ndate) {
            sails.log.info("New next orgasm date:  ", ndate);
            next(err, ndate);
        });
    });
};

exports.getOrgasmPenalty = function(type, next) {
    if (type == 1) { // Masturbation
        OrgasmService.getMasturbationPenalty(next);
    } else if (type == 2) { //Wet Dream
        next(null, 0); // no penalties for wet dreams
    } else if (type == 3) { // Sex
        OrgasmService.getSexPenalty(next);
    } else if (type == 4) { // Prostate Massage
        next(null, 0); // no penalties for a successful prostate massage
    }
};


exports.getMasturbationPenalty = function(next) {
    var min = 14;
    var max = 60;

    async.parallel({
        first: function(callback) {
            RandomService.between(min, max, callback);
        },
        offset: function(callback) {
            RandomService.between(100, 3000, callback);
        }
    }, function(error, results) {
        var penalty = results.first * (results.offset / 1000);
        next(error, Math.floor(penalty));
    });
};

exports.getSexPenalty = function(next) {
    async.parallel({
        prev: function(callback) {
            OrgasmService.getPreviousOrgasmDate(callback);
        },
        next: function(callback) {
            OrgasmService.getNextOrgasmDate(callback);
        },
        offset: function(callback) {
            RandomService.between(500, 1500, callback);
        }
    },
    function(error, results) {
        var prev = moment(results.prev);
        var nnext = moment(results.next);
        var now = moment();
        var offset = results.offset / 1000;

        var dt = nnext.diff(prev, 'days');
        var dc = now.diff(prev, 'days');
        var dr = nnext.diff(now, 'days');

        var penalty = dt - (dt * Math.sin((3.14 * Math.abs(dc - dr)) / dt));
        next(null, Math.floor(penalty * offset));
    }
    );
};