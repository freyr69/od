

/**
 * Module dependencies.
 */
var PunishmentDAL = require('../dal/punishmentDAL');
var csrfFilters = require('../filters/csrfFilters');
var membershipFilters = require('../filters/membershipFilters');

/**
 * punishmentController class
 */
(function() {

    /**
     * Attributes.
     */
    var punishmentDAL = new PunishmentDAL();

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
        app.get('/punishment/show/:id', this.show);
        app.get('/punishment/new', csrfFilters.antiForgeryToken, this.new);
        app.post('/punishment/create', this.create);
        app.get('/punishment/edit/:id', csrfFilters.antiForgeryToken, this.edit);
        app.post('/punishment/edit', this.update);
        app.get('/punishment/delete/:id', csrfFilters.antiForgeryToken, this.delete);
        app.post('/punishment/delete', this.destroy);
    };

    /**
     * [httpget]
     * PunishmentController index action.
     * @param {req} http request.
     * @param {res} http response.
     */
    PunishmentController.prototype.index = function(req, res) {
        punishmentDAL.getAll(function(punishments) {
            res.render('punishment/index', {'punishments': punishments});
        });
    };

    /**
     * [httpget]
     * PunishmentController details action.
     * @param {req} http request.
     * @param {res} http response.
     */
    PunishmentController.prototype.show = function(req, res) {
        var punishmentId = req.params.id;
        punishmentDAL.get(punishmentId, function(punishment) {
            res.render('punishment/show', {'punishment': punishment});
        });
    };

    /**
     * [httpget]
     * PunishmentController edit action.
     * @param {req} http request.
     * @param {res} http response.
     */
    PunishmentController.prototype.edit = function(req, res) {
        var punishmentId = req.params.id;
        punishmentDAL.get(punishmentId, function(punishment) {
            res.render('punishment/edit', {'punishment': punishment});
        });
    };

    /**
     * [httppost]
     * PunishmentController edit post action.
     * @param {req} http request.
     * @param {res} http response.
     */
    PunishmentController.prototype.update = function(req, res) {
        var punishment = req.body.punishment;

        punishmentDAL.get(punishment.id, function(entity) {
            if (entity) {
                punishmentDAL.update(entity, punishment, function(punishment) {
                    res.redirect('/punishment');
                });
            }
            else {
                res.send(404);
            }
        });
    };

    /**
     * [httpget]
     * punishmentController create action.
     * @param {req} http request.
     * @param {res} http response.
     */
    PunishmentController.prototype.new = function(req, res) {
        res.render('punishment/create');
    };

    /**
     * [httppost]
     * punishmentController create post action.
     * @param {req} http request.
     * @param {res} http response.
     */
    PunishmentController.prototype.create = function(req, res) {
        var punishment = req.body.punishment;

        punishmentDAL.save(punishment, function(data) {
            res.redirect('/punishment');
        });
    };

    /**
     * [httpget]
     * PunishmentController delete action.
     * @param {req} http request.
     * @param {res} http response.
     */
    PunishmentController.prototype.delete = function(req, res) {
        var punishmentId = req.params.id;
        punishmentDAL.get(punishmentId, function(punishment) {
            res.render('punishment/delete', {'punishment': punishment});
        });
    };

    /**
     * [httppost]
     * PunishmentController delete post action.
     * @param {req} http request.
     * @param {res} http response.
     */
    PunishmentController.prototype.destroy = function(req, res) {
        var punishment = req.body.punishment;
        punishmentDAL.remove(punishment.id, function(data) {
            res.redirect('/punishment');
        });
    };

    module.exports = PunishmentController;
})();