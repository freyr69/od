

/**
 * Module dependencies.
 */
var TaskDAL = require('../dal/taskDAL');
var csrfFilters = require('../filters/csrfFilters');
var membershipFilters = require('../filters/membershipFilters');

/**
 * taskController class
 */
(function() {

    /**
     * Attributes.
     */
    var taskDAL = new TaskDAL();

    /**
     * Constructor.
     * @param {app} - express app.
     */
    function TaskController(app) {
        this.routes(app);
    }

    /**
     * taskController routes.
     * @param {app} - express app.
     */
    TaskController.prototype.routes = function(app) {
        app.all('/task*', membershipFilters.authorize, csrfFilters.csrf);

        app.get('/task', this.index);
        app.get('/task/show/:id', this.show);
        app.get('/task/new', csrfFilters.antiForgeryToken, this.new);
        app.post('/task/create', this.create);
        app.get('/task/edit/:id', csrfFilters.antiForgeryToken, this.edit);
        app.post('/task/edit', this.update);
        app.get('/task/delete/:id', csrfFilters.antiForgeryToken, this.delete);
        app.post('/task/delete', this.destroy);
    };

    /**
     * [httpget]
     * TaskController index action.
     * @param {req} http request.
     * @param {res} http response.
     */
    TaskController.prototype.index = function(req, res) {
        taskDAL.getAll(function(tasks) {
            res.render('task/index', {'tasks': tasks});
        });
    };

    /**
     * [httpget]
     * TaskController details action.
     * @param {req} http request.
     * @param {res} http response.
     */
    TaskController.prototype.show = function(req, res) {
        var taskId = req.params.id;
        taskDAL.get(taskId, function(task) {
            res.render('task/show', {'task': task});
        });
    };

    /**
     * [httpget]
     * TaskController edit action.
     * @param {req} http request.
     * @param {res} http response.
     */
    TaskController.prototype.edit = function(req, res) {
        var taskId = req.params.id;
        taskDAL.get(taskId, function(task) {
            res.render('task/edit', {'task': task});
        });
    };

    /**
     * [httppost]
     * TaskController edit post action.
     * @param {req} http request.
     * @param {res} http response.
     */
    TaskController.prototype.update = function(req, res) {
        var task = req.body.task;

        taskDAL.get(task.id, function(entity) {
            if (entity) {
                taskDAL.update(entity, task, function(task) {
                    res.redirect('/task');
                });
            }
            else {
                res.send(404);
            }
        });
    };

    /**
     * [httpget]
     * taskController create action.
     * @param {req} http request.
     * @param {res} http response.
     */
    TaskController.prototype.new = function(req, res) {
        res.render('task/create');
    };

    /**
     * [httppost]
     * taskController create post action.
     * @param {req} http request.
     * @param {res} http response.
     */
    TaskController.prototype.create = function(req, res) {
        var task = req.body.task;

        taskDAL.save(task, function(data) {
            res.redirect('/task');
        });
    };

    /**
     * [httpget]
     * TaskController delete action.
     * @param {req} http request.
     * @param {res} http response.
     */
    TaskController.prototype.delete = function(req, res) {
        var taskId = req.params.id;
        taskDAL.get(taskId, function(task) {
            res.render('task/delete', {'task': task});
        });
    };

    /**
     * [httppost]
     * TaskController delete post action.
     * @param {req} http request.
     * @param {res} http response.
     */
    TaskController.prototype.destroy = function(req, res) {
        var task = req.body.task;
        taskDAL.remove(task.id, function(data) {
            res.redirect('/task');
        });
    };

    module.exports = TaskController;
})();