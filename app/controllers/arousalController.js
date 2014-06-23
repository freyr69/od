

/**
 * Module dependencies.
 */
var ArousalDAL = require('../dal/arousalDAL');
var csrfFilters = require('../filters/csrfFilters');
var membershipFilters = require('../filters/membershipFilters');
var moment = require('moment');

/**
 * arousalController class
 */
(function() {

    /**
     * Attributes.
     */
    var arousalDAL = new ArousalDAL();

    /**
     * Constructor.
     * @param {app} - express app.
     */
    function ArousalController(app) {
        this.routes(app);
    }

    /**
     * arousalController routes.
     * @param {app} - express app.
     */
    ArousalController.prototype.routes = function(app) {
        app.all('/arousal*', membershipFilters.authorize, csrfFilters.csrf);

        app.get('/arousal', this.index);
        app.get('/arousal/log/:level', this.log);
    };

    /**
     * [httpget]
     * ArousalController index action.
     * @param {req} http request.
     * @param {res} http response.
     */
    ArousalController.prototype.index = function(req, res) {
        arousalDAL.getLatest(function(arousal) {
            console.log("latest arousal level", arousal);
            res.render('arousal/index', {'arousal': arousal, moment: moment});
        });
    };

    /**
     * [httpget]
     * arousalController create arousal log entry.
     * @param {req} http request.
     * @param {res} http response.
     */
    ArousalController.prototype.log = function(req, res) {
        var level = req.params.level;

        arousalDAL.logLevel(level, function(data) {
            res.redirect('/arousal');
        });
    };

    module.exports = ArousalController;
})();