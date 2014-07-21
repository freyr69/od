

/**
 * Module dependencies.
 */
var ExerciseLogDAL = require('../dal/exerciseLogDAL');
var csrfFilters = require('../filters/csrfFilters');

/**
 * exerciseLogController class
 */
(function() {

    /**
     * Attributes.
     */
    var exerciseLogDAL = new ExerciseLogDAL();

    /**
     * Constructor.
     * @param {app} - express app.
     */
    function ExerciseLogController(app) {
        this.routes(app);
    }

    /**
     * exerciseLogController routes.
     * @param {app} - express app.
     */
    ExerciseLogController.prototype.routes = function(app) {
        app.all('/exerciseLog*', csrfFilters.csrf);

        app.get('/exerciseLog', this.index);
        app.get('/exerciseLog/show/:id', this.show);
        app.get('/exerciseLog/new', csrfFilters.antiForgeryToken, this.new);
        app.post('/exerciseLog/create', this.create);
        app.get('/exerciseLog/edit/:id', csrfFilters.antiForgeryToken, this.edit);
        app.post('/exerciseLog/edit', this.update);
        app.get('/exerciseLog/delete/:id', csrfFilters.antiForgeryToken, this.delete);
        app.post('/exerciseLog/delete', this.destroy);
    };

    /**
     * [httpget]
     * ExerciseLogController index action.
     * @param {req} http request.
     * @param {res} http response.
     */
    ExerciseLogController.prototype.index = function(req, res) {
        exerciseLogDAL.getAll(function(exerciseLogs) {
            res.render('exerciseLog/index', {'exerciseLogs': exerciseLogs});
        });
    };

    /**
     * [httpget]
     * ExerciseLogController details action.
     * @param {req} http request.
     * @param {res} http response.
     */
    ExerciseLogController.prototype.show = function(req, res) {
        var exerciseLogId = req.params.id;
        exerciseLogDAL.get(exerciseLogId, function(exerciseLog) {
            res.render('exerciseLog/show', {'exerciseLog': exerciseLog});
        });
    };

    /**
     * [httpget]
     * ExerciseLogController edit action.
     * @param {req} http request.
     * @param {res} http response.
     */
    ExerciseLogController.prototype.edit = function(req, res) {
        var exerciseLogId = req.params.id;
        exerciseLogDAL.get(exerciseLogId, function(exerciseLog) {
            res.render('exerciseLog/edit', {'exerciseLog': exerciseLog});
        });
    };

    /**
     * [httppost]
     * ExerciseLogController edit post action.
     * @param {req} http request.
     * @param {res} http response.
     */
    ExerciseLogController.prototype.update = function(req, res) {
        var exerciseLog = req.body.exerciseLog;

        exerciseLog.start = new Date(exerciseLog.start.year, exerciseLog.start.month, exerciseLog.start.day);
        exerciseLog.end = new Date(exerciseLog.end.year, exerciseLog.end.month, exerciseLog.end.day);

        exerciseLogDAL.get(exerciseLog.id, function(entity) {
            if (entity) {
                exerciseLogDAL.update(entity, exerciseLog, function(exerciseLog) {
                    res.redirect('/exerciseLog');
                });
            }
            else {
                res.send(404);
            }
        });
    };

    /**
     * [httpget]
     * exerciseLogController create action.
     * @param {req} http request.
     * @param {res} http response.
     */
    ExerciseLogController.prototype.new = function(req, res) {
        res.render('exerciseLog/create');
    };

    /**
     * [httppost]
     * exerciseLogController create post action.
     * @param {req} http request.
     * @param {res} http response.
     */
    ExerciseLogController.prototype.create = function(req, res) {
        var exerciseLog = req.body.exerciseLog;

        exerciseLog.start = new Date(exerciseLog.start.year, exerciseLog.start.month, exerciseLog.start.day);
        exerciseLog.end = new Date(exerciseLog.end.year, exerciseLog.end.month, exerciseLog.end.day);

        exerciseLogDAL.save(exerciseLog, function(data) {
            res.redirect('/exerciseLog');
        });
    };

    /**
     * [httpget]
     * ExerciseLogController delete action.
     * @param {req} http request.
     * @param {res} http response.
     */
    ExerciseLogController.prototype.delete = function(req, res) {
        var exerciseLogId = req.params.id;
        exerciseLogDAL.get(exerciseLogId, function(exerciseLog) {
            res.render('exerciseLog/delete', {'exerciseLog': exerciseLog});
        });
    };

    /**
     * [httppost]
     * ExerciseLogController delete post action.
     * @param {req} http request.
     * @param {res} http response.
     */
    ExerciseLogController.prototype.destroy = function(req, res) {
        var exerciseLog = req.body.exerciseLog;
        exerciseLogDAL.remove(exerciseLog.id, function(data) {
            res.redirect('/exerciseLog');
        });
    };

    module.exports = ExerciseLogController;
})();