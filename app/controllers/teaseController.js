

/**
 * Module dependencies.
 */
var TeaseDAL = require('../dal/teaseDAL');
var csrfFilters = require('../filters/csrfFilters');
var membershipFilters = require('../filters/membershipFilters');

/**
 * teaseController class
 */
(function() {

    /**
     * Attributes.
     */
    var teaseDAL = new TeaseDAL();

    /**
     * Constructor.
     * @param {app} - express app.
     */
    function TeaseController(app) {
        this.routes(app);
    }

    /**
     * teaseController routes.
     * @param {app} - express app.
     */
    TeaseController.prototype.routes = function(app) {
        app.all('/tease*', membershipFilters.authorize, csrfFilters.csrf);

        app.get('/tease', this.index);
        app.get('/tease/show/:id', this.show);
        app.get('/tease/new', csrfFilters.antiForgeryToken, this.new);
        app.post('/tease/create', this.create);
        app.get('/tease/edit/:id', csrfFilters.antiForgeryToken, this.edit);
        app.post('/tease/edit', this.update);
        app.get('/tease/delete/:id', csrfFilters.antiForgeryToken, this.delete);
        app.post('/tease/delete', this.destroy);
    };

    /**
     * [httpget]
     * TeaseController index action.
     * @param {req} http request.
     * @param {res} http response.
     */
    TeaseController.prototype.index = function(req, res) {
        teaseDAL.getAll(function(teases) {
            res.render('tease/index', {'teases': teases});
        });
    };

    /**
     * [httpget]
     * TeaseController details action.
     * @param {req} http request.
     * @param {res} http response.
     */
    TeaseController.prototype.show = function(req, res) {
        var teaseId = req.params.id;
        teaseDAL.get(teaseId, function(tease) {
            res.render('tease/show', {'tease': tease});
        });
    };

    /**
     * [httpget]
     * TeaseController edit action.
     * @param {req} http request.
     * @param {res} http response.
     */
    TeaseController.prototype.edit = function(req, res) {
        var teaseId = req.params.id;
        teaseDAL.get(teaseId, function(tease) {
            res.render('tease/edit', {'tease': tease});
        });
    };

    /**
     * [httppost]
     * TeaseController edit post action.
     * @param {req} http request.
     * @param {res} http response.
     */
    TeaseController.prototype.update = function(req, res) {
        var tease = req.body.tease;

        teaseDAL.get(tease.id, function(entity) {
            if (entity) {
                teaseDAL.update(entity, tease, function(tease) {
                    res.redirect('/tease');
                });
            }
            else {
                res.send(404);
            }
        });
    };

    /**
     * [httpget]
     * teaseController create action.
     * @param {req} http request.
     * @param {res} http response.
     */
    TeaseController.prototype.new = function(req, res) {
        res.render('tease/create');
    };

    /**
     * [httppost]
     * teaseController create post action.
     * @param {req} http request.
     * @param {res} http response.
     */
    TeaseController.prototype.create = function(req, res) {
        var tease = req.body.tease;

        teaseDAL.save(tease, function(data) {
            res.redirect('/tease');
        });
    };

    /**
     * [httpget]
     * TeaseController delete action.
     * @param {req} http request.
     * @param {res} http response.
     */
    TeaseController.prototype.delete = function(req, res) {
        var teaseId = req.params.id;
        teaseDAL.get(teaseId, function(tease) {
            res.render('tease/delete', {'tease': tease});
        });
    };

    /**
     * [httppost]
     * TeaseController delete post action.
     * @param {req} http request.
     * @param {res} http response.
     */
    TeaseController.prototype.destroy = function(req, res) {
        var tease = req.body.tease;
        teaseDAL.remove(tease.id, function(data) {
            res.redirect('/tease');
        });
    };

    module.exports = TeaseController;
})();