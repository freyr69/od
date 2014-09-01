/**
 * Module dependencies.
 */
var HealthDAL = require('../dal/healthDAL');
var csrfFilters = require('../filters/csrfFilters');
var membershipFilters = require('../filters/membershipFilters');
var moment = require('moment-timezone');



/**
 * healthController class
 */
(function () {

    /**
     * Attributes.
     */
    var healthDAL = new HealthDAL();
    
    /**
     * Constructor.
     * @param {app} - express app.
     */
    function healthController(app) {
        this.routes(app);
    }

    /**
     * Controller routes
     * @param  {express} app
     */
    healthController.prototype.routes = function (app) {
        app.all('/health*', membershipFilters.authorize, csrfFilters.csrf);
        app.get('/health', csrfFilters.antiForgeryToken, this.index);
        app.post('/health/log', this.log);
    };



    /**
     * [HttpGet].
     * index action
     * @param  {request} req
     * @param  {response} res
     */
    healthController.prototype.index = function (req, res) {
        healthDAL.getLatest(function(health) {
            console.log("latest health log", health);
            //health.date = moment.utc();
            res.render('health/index', {'health': health});
        });
    };

    /**
     * [HttpPost].
     * log action
     * @param  {request} req
     * @param  {response} res
     */
    healthController.prototype.log = function (req, res) {
        var health = req.body.health;
        health.date = moment.utc();

        healthDAL.logHealth(health, function(data) {
            res.redirect('/health');
        });
    };



    module.exports = healthController;
})();