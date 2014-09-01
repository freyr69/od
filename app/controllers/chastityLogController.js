

/**
 * Module dependencies.
 */
var ChastityLogDAL = require('../dal/chastityLogDAL');
var csrfFilters = require('../filters/csrfFilters');
var membershipFilters = require('../filters/membershipFilters');
var moment = require('moment-timezone');
require('moment-duration-format');

/**
 * chastityLogController class
 */
(function() {

    /**
     * Attributes.
     */
    var chastityLogDAL = new ChastityLogDAL();

    /**
     * Constructor.
     * @param {app} - express app.
     */
    function ChastityLogController(app) {
        this.routes(app);
    }

    /**
     * chastityLogController routes.
     * @param {app} - express app.
     */
    ChastityLogController.prototype.routes = function(app) {
        app.all('/chastity*', membershipFilters.authorize, csrfFilters.csrf);

        app.get('/chastity', this.index);
        app.get('/chastity/start', this.start);
        app.get('/chastity/stop', this.stop);
    };

    /**
     * [httpget]
     * ChastityLogController index action.
     * @param {req} http request.
     * @param {res} http response.
     */
    ChastityLogController.prototype.index = function(req, res) {
        chastityLogDAL.getLatest(function(chastityLog) {

            res.render('chastityLog/index', {
                lastDate: chastityLog.end,
                startDate: chastityLog.start,
                inChastity: (chastityLog.end === null) ? true : false
            });
        });
    };
    
    /**
     * [httpget]
     * Start a chastity session
     * @param {req} req
     * @param {res} res
     */
    ChastityLogController.prototype.start = function(req, res) {
        var chastityLog = {
            start: moment.utc()
        };

        chastityLogDAL.startSession(function(data) {
            res.redirect('/chastity');
        });
    };
    
    /**
     * [httpget]
     * Stop a chastity session
     * @param {req} req
     * @param {res} res
     */
    ChastityLogController.prototype.stop = function(req, res) {

        chastityLogDAL.endSession(function(data) {
            res.redirect('/chastity');
        });
    };

    module.exports = ChastityLogController;
})();