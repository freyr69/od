

/**
 * Module dependencies.
 */
var OrgasmDAL = require('../dal/orgasmDAL');
var OrgasmLogDAL = require('../dal/orgasmLogDAL');
var csrfFilters = require('../filters/csrfFilters');
var membershipFilters = require('../filters/membershipFilters');
var async = require('async');
var moment = require('moment-timezone');

/**
 * orgasmController class
 */
(function() {

    /**
     * Attributes.
     */
    var orgasmDAL = new OrgasmDAL();
    var orgasmLogDAL = new OrgasmLogDAL();

    /**
     * Constructor.
     * @param {app} app - express app.
     */
    function OrgasmController(app) {
        this.routes(app);
    }

    /**
     * orgasmController routes.
     * @param {app} app - express app.
     */
    OrgasmController.prototype.routes = function(app) {
        app.all('/orgasm*', membershipFilters.authorize, csrfFilters.csrf);

        app.get('/orgasm', this.index);
        app.get('/orgasm/log/:type', this.log);
    };

    /**
     * [httpget]
     * OrgasmController index action.
     * @param {req} req http request.
     * @param {res} res http response.
     */
    OrgasmController.prototype.index = function(req, res) {

        async.parallel({
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
            var offset = moment().diff(moment(results.last), 'days');
            var pct = Math.round((offset / total) * 100);

            res.render('orgasm/index', {
                lastDate: results.last,
                nextDate: results.next,
                days: days,
                total: total,
                pct: pct
            });
        });
    };

    /**
     * [httpget]
     * OrgasmController details action.
     * @param {req} req http request.
     * @param {res} res http response.
     */
    OrgasmController.prototype.log = function(req, res) {
        var type = req.params.type;
        if (type === null) {
            type = 1; // default to masturbation
        }

        async.parallel({
            newOrgasmDate: function(callback) {
                orgasmDAL.updateOrgasmDate(type, callback);
            },
            logEntry: function(callback) {
                orgasmLogDAL.log(type, callback);
            }
        }, function(err, result) {
            return res.redirect('/orgasm');
        });
    };

    module.exports = OrgasmController;
})();