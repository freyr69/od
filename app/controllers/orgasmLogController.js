

/**
 * Module dependencies.
 */
var OrgasmLogDAL = require('../dal/orgasmLogDAL');
var csrfFilters = require('../filters/csrfFilters');
var membershipFilters = require('../filters/membershipFilters');

/**
 * orgasmLogController class
 */
(function() {

    /**
     * Attributes.
     */
    var orgasmLogDAL = new OrgasmLogDAL();

    /**
     * Constructor.
     * @param {app} - express app.
     */
    function OrgasmLogController(app) {
        this.routes(app);
    }

    /**
     * orgasmLogController routes.
     * @param {app} - express app.
     */
    OrgasmLogController.prototype.routes = function(app) {
        app.all('/orgasmLog*', membershipFilters.authorize, csrfFilters.csrf);

        app.get('/orgasmLog', this.index);
        app.get('/orgasmLog/show/:id', this.show);
        app.get('/orgasmLog/new', csrfFilters.antiForgeryToken, this.new);
        app.post('/orgasmLog/create', this.create);
        app.get('/orgasmLog/edit/:id', csrfFilters.antiForgeryToken, this.edit);
        app.post('/orgasmLog/edit', this.update);
        app.get('/orgasmLog/delete/:id', csrfFilters.antiForgeryToken, this.delete);
        app.post('/orgasmLog/delete', this.destroy);
    };

    /**
     * [httpget]
     * OrgasmLogController index action.
     * @param {req} http request.
     * @param {res} http response.
     */
    OrgasmLogController.prototype.index = function(req, res) {
        orgasmLogDAL.getAll(function(orgasmLogs) {
            res.render('orgasmLog/index', {'orgasmLogs': orgasmLogs});
        });
    };

    /**
     * [httpget]
     * OrgasmLogController details action.
     * @param {req} http request.
     * @param {res} http response.
     */
    OrgasmLogController.prototype.show = function(req, res) {
        var orgasmLogId = req.params.id;
        orgasmLogDAL.get(orgasmLogId, function(orgasmLog) {
            res.render('orgasmLog/show', {'orgasmLog': orgasmLog});
        });
    };

    /**
     * [httpget]
     * OrgasmLogController edit action.
     * @param {req} http request.
     * @param {res} http response.
     */
    OrgasmLogController.prototype.edit = function(req, res) {
        var orgasmLogId = req.params.id;
        orgasmLogDAL.get(orgasmLogId, function(orgasmLog) {
            res.render('orgasmLog/edit', {'orgasmLog': orgasmLog});
        });
    };

    /**
     * [httppost]
     * OrgasmLogController edit post action.
     * @param {req} http request.
     * @param {res} http response.
     */
    OrgasmLogController.prototype.update = function(req, res) {
        var orgasmLog = req.body.orgasmLog;

        orgasmLog.date = new Date(orgasmLog.date.year, orgasmLog.date.month, orgasmLog.date.day);

        orgasmLogDAL.get(orgasmLog.id, function(entity) {
            if (entity) {
                orgasmLogDAL.update(entity, orgasmLog, function(orgasmLog) {
                    res.redirect('/orgasmLog');
                });
            }
            else {
                res.send(404);
            }
        });
    };

    /**
     * [httpget]
     * orgasmLogController create action.
     * @param {req} http request.
     * @param {res} http response.
     */
    OrgasmLogController.prototype.new = function(req, res) {
        res.render('orgasmLog/create');
    };

    /**
     * [httppost]
     * orgasmLogController create post action.
     * @param {req} http request.
     * @param {res} http response.
     */
    OrgasmLogController.prototype.create = function(req, res) {
        var orgasmLog = req.body.orgasmLog;

        orgasmLog.date = new Date(orgasmLog.date.year, orgasmLog.date.month, orgasmLog.date.day);

        orgasmLogDAL.save(orgasmLog, function(data) {
            res.redirect('/orgasmLog');
        });
    };

    /**
     * [httpget]
     * OrgasmLogController delete action.
     * @param {req} http request.
     * @param {res} http response.
     */
    OrgasmLogController.prototype.delete = function(req, res) {
        var orgasmLogId = req.params.id;
        orgasmLogDAL.get(orgasmLogId, function(orgasmLog) {
            res.render('orgasmLog/delete', {'orgasmLog': orgasmLog});
        });
    };

    /**
     * [httppost]
     * OrgasmLogController delete post action.
     * @param {req} http request.
     * @param {res} http response.
     */
    OrgasmLogController.prototype.destroy = function(req, res) {
        var orgasmLog = req.body.orgasmLog;
        orgasmLogDAL.remove(orgasmLog.id, function(data) {
            res.redirect('/orgasmLog');
        });
    };

    module.exports = OrgasmLogController;
})();