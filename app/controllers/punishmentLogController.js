

/**
 * Module dependencies.
 */
var PunishmentLogDAL = require('../dal/punishmentLogDAL');
var csrfFilters = require('../filters/csrfFilters');
var membershipFilters = require('../filters/membershipFilters');

/**
 * punishmentLogController class
 */
(function() {

    /**
     * Attributes.
     */
    var punishmentLogDAL = new PunishmentLogDAL();

    /**
     * Constructor.
     * @param {app} - express app.
     */
    function PunishmentLogController(app) {
        this.routes(app);
    }

    /**
     * punishmentLogController routes.
     * @param {app} - express app.
     */
    PunishmentLogController.prototype.routes = function(app) {
        app.all('/punishmentLog*', membershipFilters.authorize, csrfFilters.csrf);

        app.get('/punishmentLog', this.index);
        app.get('/punishmentLog/show/:id', this.show);
        app.get('/punishmentLog/new', csrfFilters.antiForgeryToken, this.new);
        app.post('/punishmentLog/create', this.create);
        app.get('/punishmentLog/edit/:id', csrfFilters.antiForgeryToken, this.edit);
        app.post('/punishmentLog/edit', this.update);
        app.get('/punishmentLog/delete/:id', csrfFilters.antiForgeryToken, this.delete);
        app.post('/punishmentLog/delete', this.destroy);
    };

    /**
     * [httpget]
     * PunishmentLogController index action.
     * @param {req} http request.
     * @param {res} http response.
     */
    PunishmentLogController.prototype.index = function(req, res) {
        punishmentLogDAL.getAll(function(punishmentLogs) {
            res.render('punishmentLog/index', {'punishmentLogs': punishmentLogs});
        });
    };

    /**
     * [httpget]
     * PunishmentLogController details action.
     * @param {req} http request.
     * @param {res} http response.
     */
    PunishmentLogController.prototype.show = function(req, res) {
        var punishmentLogId = req.params.id;
        punishmentLogDAL.get(punishmentLogId, function(punishmentLog) {
            res.render('punishmentLog/show', {'punishmentLog': punishmentLog});
        });
    };

    /**
     * [httpget]
     * PunishmentLogController edit action.
     * @param {req} http request.
     * @param {res} http response.
     */
    PunishmentLogController.prototype.edit = function(req, res) {
        var punishmentLogId = req.params.id;
        punishmentLogDAL.get(punishmentLogId, function(punishmentLog) {
            res.render('punishmentLog/edit', {'punishmentLog': punishmentLog});
        });
    };

    /**
     * [httppost]
     * PunishmentLogController edit post action.
     * @param {req} http request.
     * @param {res} http response.
     */
    PunishmentLogController.prototype.update = function(req, res) {
        var punishmentLog = req.body.punishmentLog;

        punishmentLog.assigned = new Date(punishmentLog.assigned.year, punishmentLog.assigned.month, punishmentLog.assigned.day);

        punishmentLog.maxStart = new Date(punishmentLog.maxStart.year, punishmentLog.maxStart.month, punishmentLog.maxStart.day);

        punishmentLog.maxEnd = new Date(punishmentLog.maxEnd.year, punishmentLog.maxEnd.month, punishmentLog.maxEnd.day);

        punishmentLog.start = new Date(punishmentLog.start.year, punishmentLog.start.month, punishmentLog.start.day);

        punishmentLog.end = new Date(punishmentLog.end.year, punishmentLog.end.month, punishmentLog.end.day);

        punishmentLogDAL.get(punishmentLog.id, function(entity) {
            if (entity) {
                punishmentLogDAL.update(entity, punishmentLog, function(punishmentLog) {
                    res.redirect('/punishmentLog');
                });
            }
            else {
                res.send(404);
            }
        });
    };

    /**
     * [httpget]
     * punishmentLogController create action.
     * @param {req} http request.
     * @param {res} http response.
     */
    PunishmentLogController.prototype.new = function(req, res) {
        res.render('punishmentLog/create');
    };

    /**
     * [httppost]
     * punishmentLogController create post action.
     * @param {req} http request.
     * @param {res} http response.
     */
    PunishmentLogController.prototype.create = function(req, res) {
        var punishmentLog = req.body.punishmentLog;

        punishmentLog.assigned = new Date(punishmentLog.assigned.year, punishmentLog.assigned.month, punishmentLog.assigned.day);

        punishmentLog.maxStart = new Date(punishmentLog.maxStart.year, punishmentLog.maxStart.month, punishmentLog.maxStart.day);

        punishmentLog.maxEnd = new Date(punishmentLog.maxEnd.year, punishmentLog.maxEnd.month, punishmentLog.maxEnd.day);

        punishmentLog.start = new Date(punishmentLog.start.year, punishmentLog.start.month, punishmentLog.start.day);

        punishmentLog.end = new Date(punishmentLog.end.year, punishmentLog.end.month, punishmentLog.end.day);

        punishmentLogDAL.save(punishmentLog, function(data) {
            res.redirect('/punishmentLog');
        });
    };

    /**
     * [httpget]
     * PunishmentLogController delete action.
     * @param {req} http request.
     * @param {res} http response.
     */
    PunishmentLogController.prototype.delete = function(req, res) {
        var punishmentLogId = req.params.id;
        punishmentLogDAL.get(punishmentLogId, function(punishmentLog) {
            res.render('punishmentLog/delete', {'punishmentLog': punishmentLog});
        });
    };

    /**
     * [httppost]
     * PunishmentLogController delete post action.
     * @param {req} http request.
     * @param {res} http response.
     */
    PunishmentLogController.prototype.destroy = function(req, res) {
        var punishmentLog = req.body.punishmentLog;
        punishmentLogDAL.remove(punishmentLog.id, function(data) {
            res.redirect('/punishmentLog');
        });
    };

    module.exports = PunishmentLogController;
})();