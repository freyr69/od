

/**
 * Module dependencies.
 */
var TeaseLogDAL = require('../dal/teaseLogDAL');
var csrfFilters = require('../filters/csrfFilters');
var membershipFilters = require('../filters/membershipFilters');

/**
 * teaseLogController class
 */
(function() {

    /**
     * Attributes.
     */
    var teaseLogDAL = new TeaseLogDAL();

    /**
     * Constructor.
     * @param {app} - express app.
     */
    function TeaseLogController(app) {
        this.routes(app);
    }

    /**
     * teaseLogController routes.
     * @param {app} - express app.
     */
    TeaseLogController.prototype.routes = function(app) {
        app.all('/teaseLog*', membershipFilters.authorize, csrfFilters.csrf);

        app.get('/teaseLog', this.index);
        app.get('/teaseLog/show/:id', this.show);
        app.get('/teaseLog/new', csrfFilters.antiForgeryToken, this.new);
        app.post('/teaseLog/create', this.create);
        app.get('/teaseLog/edit/:id', csrfFilters.antiForgeryToken, this.edit);
        app.post('/teaseLog/edit', this.update);
        app.get('/teaseLog/delete/:id', csrfFilters.antiForgeryToken, this.delete);
        app.post('/teaseLog/delete', this.destroy);
    };

    /**
     * [httpget]
     * TeaseLogController index action.
     * @param {req} http request.
     * @param {res} http response.
     */
    TeaseLogController.prototype.index = function(req, res) {
        teaseLogDAL.getAll(function(teaseLogs) {
            res.render('teaseLog/index', {'teaseLogs': teaseLogs});
        });
    };

    /**
     * [httpget]
     * TeaseLogController details action.
     * @param {req} http request.
     * @param {res} http response.
     */
    TeaseLogController.prototype.show = function(req, res) {
        var teaseLogId = req.params.id;
        teaseLogDAL.get(teaseLogId, function(teaseLog) {
            res.render('teaseLog/show', {'teaseLog': teaseLog});
        });
    };

    /**
     * [httpget]
     * TeaseLogController edit action.
     * @param {req} http request.
     * @param {res} http response.
     */
    TeaseLogController.prototype.edit = function(req, res) {
        var teaseLogId = req.params.id;
        teaseLogDAL.get(teaseLogId, function(teaseLog) {
            res.render('teaseLog/edit', {'teaseLog': teaseLog});
        });
    };

    /**
     * [httppost]
     * TeaseLogController edit post action.
     * @param {req} http request.
     * @param {res} http response.
     */
    TeaseLogController.prototype.update = function(req, res) {
        var teaseLog = req.body.teaseLog;

        teaseLog.start = new Date(teaseLog.start.year, teaseLog.start.month, teaseLog.start.day);

        teaseLog.end = new Date(teaseLog.end.year, teaseLog.end.month, teaseLog.end.day);

        teaseLogDAL.get(teaseLog.id, function(entity) {
            if (entity) {
                teaseLogDAL.update(entity, teaseLog, function(teaseLog) {
                    res.redirect('/teaseLog');
                });
            }
            else {
                res.send(404);
            }
        });
    };

    /**
     * [httpget]
     * teaseLogController create action.
     * @param {req} http request.
     * @param {res} http response.
     */
    TeaseLogController.prototype.new = function(req, res) {
        res.render('teaseLog/create');
    };

    /**
     * [httppost]
     * teaseLogController create post action.
     * @param {req} http request.
     * @param {res} http response.
     */
    TeaseLogController.prototype.create = function(req, res) {
        var teaseLog = req.body.teaseLog;

        teaseLog.start = new Date(teaseLog.start.year, teaseLog.start.month, teaseLog.start.day);

        teaseLog.end = new Date(teaseLog.end.year, teaseLog.end.month, teaseLog.end.day);

        teaseLogDAL.save(teaseLog, function(data) {
            res.redirect('/teaseLog');
        });
    };

    /**
     * [httpget]
     * TeaseLogController delete action.
     * @param {req} http request.
     * @param {res} http response.
     */
    TeaseLogController.prototype.delete = function(req, res) {
        var teaseLogId = req.params.id;
        teaseLogDAL.get(teaseLogId, function(teaseLog) {
            res.render('teaseLog/delete', {'teaseLog': teaseLog});
        });
    };

    /**
     * [httppost]
     * TeaseLogController delete post action.
     * @param {req} http request.
     * @param {res} http response.
     */
    TeaseLogController.prototype.destroy = function(req, res) {
        var teaseLog = req.body.teaseLog;
        teaseLogDAL.remove(teaseLog.id, function(data) {
            res.redirect('/teaseLog');
        });
    };

    module.exports = TeaseLogController;
})();