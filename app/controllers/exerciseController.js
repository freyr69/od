

/**
 * Module dependencies.
 */
var ExerciseDAL = require('../dal/exerciseDAL');
var csrfFilters = require('../filters/csrfFilters');

/**
 * exerciseController class
 */
(function() {

    /**
     * Attributes.
     */
    var exerciseDAL = new ExerciseDAL();

    /**
     * Constructor
     * @param {app} app
     * @returns {null}
     */
    function ExerciseController(app) {
        this.routes(app);
    }

    /**
     * exerciseController routes
     * @param {app} app
     * @returns {null}
     */
    ExerciseController.prototype.routes = function(app) {
        app.all('/exercise*', csrfFilters.csrf);

        app.get('/exercise', this.index);
        app.get('/exercise/new', csrfFilters.antiForgeryToken, this.new);
        app.post('/exercise/create', this.create);
        app.get('/exercise/edit/:id', csrfFilters.antiForgeryToken, this.edit);
        app.post('/exercise/edit', this.update);
        app.get('/exercise/delete/:id', csrfFilters.antiForgeryToken, this.delete);
        app.post('/exercise/delete', this.destroy);
    };

    /**
     * [httpget]
     * ExerciseController index action.
     * @param {req} http request.
     * @param {res} http response.
     */
    ExerciseController.prototype.index = function(req, res) {
        exerciseDAL.getAll(function(exercises) {
            res.render('exercise/index', {'exercises': exercises});
        });
    };

    /**
     * [httpget]
     * ExerciseController edit action.
     * @param {req} http request.
     * @param {res} http response.
     */
    ExerciseController.prototype.edit = function(req, res) {
        var exerciseId = req.params.id;
        exerciseDAL.get(exerciseId, function(exercise) {
            res.render('exercise/edit', {'exercise': exercise});
        });
    };

    /**
     * [httppost]
     * ExerciseController edit post action.
     * @param {req} http request.
     * @param {res} http response.
     */
    ExerciseController.prototype.update = function(req, res) {
        var exercise = req.body.exercise;
        exerciseDAL.get(exercise.id, function(entity) {
            if (entity) {
                exerciseDAL.update(entity, exercise, function(exercise) {
                    res.redirect('/exercise');
                });
            }
            else {
                res.send(404);
            }
        });
    };

    /**
     * [httpget]
     * exerciseController create action.
     * @param {req} http request.
     * @param {res} http response.
     */
    ExerciseController.prototype.new = function(req, res) {
        res.render('exercise/create');
    };

    /**
     * [httppost]
     * exerciseController create post action.
     * @param {req} http request.
     * @param {res} http response.
     */
    ExerciseController.prototype.create = function(req, res) {
        var exercise = req.body.exercise;
        exerciseDAL.save(exercise, function(data) {
            res.redirect('/exercise');
        });
    };

    /**
     * [httpget]
     * ExerciseController delete action.
     * @param {req} http request.
     * @param {res} http response.
     */
    ExerciseController.prototype.delete = function(req, res) {
        var exerciseId = req.params.id;
        exerciseDAL.get(exerciseId, function(exercise) {
            res.render('exercise/delete', {'exercise': exercise});
        });
    };

    /**
     * [httppost]
     * ExerciseController delete post action.
     * @param {req} http request.
     * @param {res} http response.
     */
    ExerciseController.prototype.destroy = function(req, res) {
        var exercise = req.body.exercise;
        exerciseDAL.remove(exercise.id, function(data) {
            res.redirect('/exercise');
        });
    };

    module.exports = ExerciseController;
})();