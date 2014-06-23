

/**
 * Module dependencies.
 */
var TaskLogDAL = require('../dal/taskLogDAL');
var csrfFilters = require('../filters/csrfFilters');
var membershipFilters = require('../filters/membershipFilters');

/**
 * taskLogController class
 */
(function() {

    /**
     * Attributes.
     */
    var taskLogDAL = new TaskLogDAL();

    /**
     * Constructor.
     * @param {app} - express app.
     */
    function TaskLogController(app) {
        this.routes(app);
    }

    /**
     * taskLogController routes.
     * @param {app} - express app.
     */
    TaskLogController.prototype.routes = function(app) {
        app.all('/taskLog*', membershipFilters.authorize, csrfFilters.csrf);

        app.get('/taskLog', this.index);
        app.get('/taskLog/show/:id', this.show);
        app.get('/taskLog/new', csrfFilters.antiForgeryToken, this.new);
        app.post('/taskLog/create', this.create);
        app.get('/taskLog/edit/:id', csrfFilters.antiForgeryToken, this.edit);
        app.post('/taskLog/edit', this.update);
        app.get('/taskLog/delete/:id', csrfFilters.antiForgeryToken, this.delete);
        app.post('/taskLog/delete', this.destroy);
    };

    /**
     * [httpget]
     * TaskLogController index action.
     * @param {req} http request.
     * @param {res} http response.
     */
    TaskLogController.prototype.index = function(req, res) {
        taskLogDAL.getAll(function(taskLogs) {
            res.render('taskLog/index', {'taskLogs': taskLogs});
        });
    };

    /**
     * [httpget]
     * TaskLogController details action.
     * @param {req} http request.
     * @param {res} http response.
     */
    TaskLogController.prototype.show = function(req, res) {
        var taskLogId = req.params.id;
        taskLogDAL.get(taskLogId, function(taskLog) {
            res.render('taskLog/show', {'taskLog': taskLog});
        });
    };

    /**
     * [httpget]
     * TaskLogController edit action.
     * @param {req} http request.
     * @param {res} http response.
     */
    TaskLogController.prototype.edit = function(req, res) {
        var taskLogId = req.params.id;
        taskLogDAL.get(taskLogId, function(taskLog) {
            res.render('taskLog/edit', {'taskLog': taskLog});
        });
    };

    /**
     * [httppost]
     * TaskLogController edit post action.
     * @param {req} http request.
     * @param {res} http response.
     */
    TaskLogController.prototype.update = function(req, res) {
        var taskLog = req.body.taskLog;

        taskLog.assigned = new Date(taskLog.assigned.year, taskLog.assigned.month, taskLog.assigned.day);

        taskLog.maxStart = new Date(taskLog.maxStart.year, taskLog.maxStart.month, taskLog.maxStart.day);

        taskLog.maxEnd = new Date(taskLog.maxEnd.year, taskLog.maxEnd.month, taskLog.maxEnd.day);

        taskLog.start = new Date(taskLog.start.year, taskLog.start.month, taskLog.start.day);

        taskLog.end = new Date(taskLog.end.year, taskLog.end.month, taskLog.end.day);

        taskLogDAL.get(taskLog.id, function(entity) {
            if (entity) {
                taskLogDAL.update(entity, taskLog, function(taskLog) {
                    res.redirect('/taskLog');
                });
            }
            else {
                res.send(404);
            }
        });
    };

    /**
     * [httpget]
     * taskLogController create action.
     * @param {req} http request.
     * @param {res} http response.
     */
    TaskLogController.prototype.new = function(req, res) {
        res.render('taskLog/create');
    };

    /**
     * [httppost]
     * taskLogController create post action.
     * @param {req} http request.
     * @param {res} http response.
     */
    TaskLogController.prototype.create = function(req, res) {
        var taskLog = req.body.taskLog;

        taskLog.assigned = new Date(taskLog.assigned.year, taskLog.assigned.month, taskLog.assigned.day);

        taskLog.maxStart = new Date(taskLog.maxStart.year, taskLog.maxStart.month, taskLog.maxStart.day);

        taskLog.maxEnd = new Date(taskLog.maxEnd.year, taskLog.maxEnd.month, taskLog.maxEnd.day);

        taskLog.start = new Date(taskLog.start.year, taskLog.start.month, taskLog.start.day);

        taskLog.end = new Date(taskLog.end.year, taskLog.end.month, taskLog.end.day);

        taskLogDAL.save(taskLog, function(data) {
            res.redirect('/taskLog');
        });
    };

    /**
     * [httpget]
     * TaskLogController delete action.
     * @param {req} http request.
     * @param {res} http response.
     */
    TaskLogController.prototype.delete = function(req, res) {
        var taskLogId = req.params.id;
        taskLogDAL.get(taskLogId, function(taskLog) {
            res.render('taskLog/delete', {'taskLog': taskLog});
        });
    };

    /**
     * [httppost]
     * TaskLogController delete post action.
     * @param {req} http request.
     * @param {res} http response.
     */
    TaskLogController.prototype.destroy = function(req, res) {
        var taskLog = req.body.taskLog;
        taskLogDAL.remove(taskLog.id, function(data) {
            res.redirect('/taskLog');
        });
    };

    module.exports = TaskLogController;
})();