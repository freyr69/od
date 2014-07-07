var OrgasmDAL = require('../dal/orgasmDAL');
var OrgasmLogDAL = require('../dal/orgasmLogDAL');
var ChatityLogDAL = require('../dal/chastityLogDAL');
var ArousalDAL = require('../dal/arousalDAL');
var PunishmentLogDAL = require('../dal/punishmentLogDAL');
var TaskLogDAL = require('../dal/taskLogDAL');
var TeaseLogDAL = require('../dal/teaseLogDAL');

var async = require('async');
var _ = require('lodash');
var moment = require('moment');

/**
 * statsController class
 */
(function () {

    var orgasmDAL = new OrgasmDAL();
    var orgasmLogDAL = new OrgasmLogDAL();
    var chastityDAL = new ChatityLogDAL();
    var arousalDAL = new ArousalDAL();
    var punishmentLogDAL = new PunishmentLogDAL();
    var taskLogDAL = new TaskLogDAL();
    var teaseLogDAL = new TeaseLogDAL();

    /**
     * Constructor.
     * @param {app} - express app.
     */
    function statsController(app) {
        this.routes(app);
    }

    /**
     * Controller routes
     * @param  {express} app
     */
    statsController.prototype.routes = function (app) {

        app.get('/stats', this.orgasm);

        app.get('/stats/orgasm', this.orgasm);

        app.get('/stats/chastity', this.chastity);

        app.get('/stats/arousal', this.arousal);

        app.get('/stats/punishment', this.punishment);

        app.get('/stats/task', this.task);

        app.get('/stats/tease', this.tease);


    };



    /**
     * [HttpGet].
     * orgasm action
     * @param  {request} req
     * @param  {response} res
     */
    statsController.prototype.orgasm = function (req, res) {
        
        var start = moment().subtract('months', 12).format('YYYY-MM-DD HH:mm:ss');
        var end = moment().format('YYYY-MM-DD HH:mm:ss');
        
        async.parallel({
            aggregate: function(callback) {
                console.log("running aggregate");
                orgasmLogDAL.getAggregate(start, end, function(data) {
                    callback(null, data);
                });
            },
            count: function(callback) {
                console.log("running count");
                orgasmLogDAL.getCount(start, end, function(data) {
                    callback(null, data);
                });
            },
            list: function(callback) {
                console.log("running list");
                orgasmLogDAL.getAll(function(data) {
                    callback(null, data);
                });
            },
            next: function(callback) {
                console.log("running next");
                orgasmDAL.getNextOrgasmDate(callback);
            },
            last: function(callback) {
                console.log("running last");
                orgasmDAL.getPreviousOrgasmDate(callback);
            }
        }, function(err, results) {
            console.log("result = ", results);

            var days = moment(results.next).diff(moment(), 'days');
            var total = moment(results.next).diff(moment(results.last), 'days');

            res.render('stats/orgasm', {
                data: results.list,
                aggregate: results.aggregate,
                count: results.count[0].count,
                lastDate: results.last,
                nextDate: results.next,
                days: days,
                total: total,
                moment: moment,
                '_': _
            });
        });
        
        
        
    };

    /**
     * [HttpGet].
     * chastity action
     * @param  {request} req
     * @param  {response} res
     */
    statsController.prototype.chastity = function (req, res) {
        async.parallel({
            max: function(callback) {
                console.log("running max");
                chastityDAL.getMaxDuration(function(data) {
                    callback(null, data);
                });
            },
            min: function(callback) {
                console.log("running min");
                chastityDAL.getMinDuration(function(data) {
                    callback(null, data);
                });
            },
            total: function(callback) {
                console.log("running min");
                chastityDAL.getTotalDuration(function(data) {
                    callback(null, data);
                });
            },
            list: function(callback) {
                console.log("running list");
                chastityDAL.getAll(function(data) {
                    callback(null, data);
                });
            }
        }, function(err, results) {
            console.log("result = ", results);

            res.render('stats/chastity', {
                data: results.list,
                max: results.max,
                min: results.min,
                total: results.total,
                moment: moment,
                '_': _
            });
        });
    };

    /**
     * [HttpGet].
     * arousal action
     * @param  {request} req
     * @param  {response} res
     */
    statsController.prototype.arousal = function (req, res) {
        arousalDAL.getAll(function (data) {
            res.render('stats/arousal', {
                data: data,
                '_': _,
                'moment': moment
            });
        });
    };

    /**
     * [HttpGet].
     * punishment action
     * @param  {request} req
     * @param  {response} res
     */
    statsController.prototype.punishment = function (req, res) {
        punishmentLogDAL.getAll(function (data) {
            res.render('stats/punishment', {
                data: data,
                '_': _,
                'moment': moment
            });
        });
    };

    /**
     * [HttpGet].
     * task action
     * @param  {request} req
     * @param  {response} res
     */
    statsController.prototype.task = function (req, res) {
        taskLogDAL.getAll(function (data) {
            res.render('stats/task', {
                data: data,
                '_': _,
                'moment': moment
            });
        });
    };

    /**
     * [HttpGet].
     * tease action
     * @param  {request} req
     * @param  {response} res
     */
    statsController.prototype.tease = function (req, res) {
        teaseLogDAL.getAll(function (data) {
            res.render('stats/tease', {
                data: data,
                '_': _,
                'moment': moment
            });
        });
    };



    module.exports = statsController;
})();