

/**
 * Module dependencies.
 */
var PunishmentDAL = require('../dal/punishmentDAL');
var PunishmentLogDAL = require('../dal/punishmentLogDAL');
var csrfFilters = require('../filters/csrfFilters');
var membershipFilters = require('../filters/membershipFilters');
var TaskUtil = require('../lib/taskUtil');

/**
 * punishmentController class
 */
(function() {

    /**
     * Attributes.
     */
    var punishmentDAL = new PunishmentDAL();
    var punishmentLogDAL = new PunishmentLogDAL();
    var taskUtil = new TaskUtil();

    /**
     * Constructor.
     * @param {app} - express app.
     */
    function PunishmentController(app) {
        this.routes(app);
    }

    /**
     * punishmentController routes.
     * @param {app} - express app.
     */
    PunishmentController.prototype.routes = function(app) {
        app.all('/punishment*', membershipFilters.authorize, csrfFilters.csrf);

        app.get('/punishment', this.index);
        app.get('/punishment/random', this.getRandom);
        app.get('/punishment/start/:id', this.start);
        app.get('/punishment/end/:id', this.end);
    };

    PunishmentController.prototype.getRandom = function(req, res) {
        punishmentDAL.getRandom(function(punishment) {
            punishment = punishment[0];

            var severity = taskUtil.getSeverity();

            var punishmentLog = {
                title: punishment.title,
                description: taskUtil.parseExpressions(punishment.description, severity),
                severity: severity,
                assigned: new Date(),
                maxStart: punishment.maxStart,
                maxEnd: punishment.maxEnd
            };

            punishmentLogDAL.save(punishmentLog, function(data) {
                res.redirect('/punishment');
            });

        });
    };


    /**
     * [httpget]
     * PunishmentController index action.
     * @param {req} http request.
     * @param {res} http response.
     */
    PunishmentController.prototype.index = function(req, res) {
        punishmentLogDAL.getActive(function(punishments) {
            res.render('punishment/index', {'punishments': punishments});
        });
    };

    PunishmentController.prototype.start = function(req, res) {
        var punishmentLogId = req.params.id;
        punishmentLogDAL.get(punishmentLogId, function(punishmentLog) {
            var entity = punishmentLog;
            entity.start = new Date();
            punishmentLogDAL.update(entity, punishmentLog, function(data) {
                res.redirect('/punishment');
            });
        });
    };

    PunishmentController.prototype.end = function(req, res) {
        var punishmentLogId = req.params.id;
        punishmentLogDAL.get(punishmentLogId, function(punishmentLog) {
            var entity = punishmentLog;
            entity.end = new Date();
            punishmentLogDAL.update(entity, punishmentLog, function(data) {
                res.redirect('/punishment');
            });
        });
    };

    module.exports = PunishmentController;
})();