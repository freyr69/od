

/**
 * Module dependencies.
 */
var FoodDAL = require('../dal/foodDAL');
var csrfFilters = require('../filters/csrfFilters');

/**
 * foodController class
 */
(function() {

    /**
     * Attributes.
     */
    var foodDAL = new FoodDAL();

    /**
     * Constructor.
     * @param {app} - express app.
     */
    function FoodController(app) {
        this.routes(app);
    }

    /**
     * foodController routes.
     * @param {app} - express app.
     */
    FoodController.prototype.routes = function(app) {
        app.all('/food*', csrfFilters.csrf);

        app.get('/food', this.index);
        app.get('/food/show/:id', this.show);
        app.get('/food/new', csrfFilters.antiForgeryToken, this.new);
        app.post('/food/create', this.create);
        app.get('/food/edit/:id', csrfFilters.antiForgeryToken, this.edit);
        app.post('/food/edit', this.update);
        app.get('/food/delete/:id', csrfFilters.antiForgeryToken, this.delete);
        app.post('/food/delete', this.destroy);
    };

    /**
     * [httpget]
     * FoodController index action.
     * @param {req} http request.
     * @param {res} http response.
     */
    FoodController.prototype.index = function(req, res) {
        foodDAL.getAll(function(foods) {
            res.render('food/index', {'foods': foods});
        });
    };

    /**
     * [httpget]
     * FoodController edit action.
     * @param {req} http request.
     * @param {res} http response.
     */
    FoodController.prototype.edit = function(req, res) {
        var foodId = req.params.id;
        foodDAL.get(foodId, function(food) {
            res.render('food/edit', {'food': food});
        });
    };

    /**
     * [httppost]
     * FoodController edit post action.
     * @param {req} http request.
     * @param {res} http response.
     */
    FoodController.prototype.update = function(req, res) {
        var food = req.body.food;

        foodDAL.get(food.id, function(entity) {
            if (entity) {
                foodDAL.update(entity, food, function(food) {
                    res.redirect('/food');
                });
            }
            else {
                res.send(404);
            }
        });
    };

    /**
     * [httpget]
     * foodController create action.
     * @param {req} http request.
     * @param {res} http response.
     */
    FoodController.prototype.new = function(req, res) {
        res.render('food/create');
    };

    /**
     * [httppost]
     * foodController create post action.
     * @param {req} http request.
     * @param {res} http response.
     */
    FoodController.prototype.create = function(req, res) {
        var food = req.body.food;

        foodDAL.save(food, function(data) {
            res.redirect('/food');
        });
    };

    /**
     * [httpget]
     * FoodController delete action.
     * @param {req} http request.
     * @param {res} http response.
     */
    FoodController.prototype.delete = function(req, res) {
        var foodId = req.params.id;
        foodDAL.get(foodId, function(food) {
            res.render('food/delete', {'food': food});
        });
    };

    /**
     * [httppost]
     * FoodController delete post action.
     * @param {req} http request.
     * @param {res} http response.
     */
    FoodController.prototype.destroy = function(req, res) {
        var food = req.body.food;
        foodDAL.remove(food.id, function(data) {
            res.redirect('/food');
        });
    };

    module.exports = FoodController;
})();