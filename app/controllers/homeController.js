var membershipFilters = require('../filters/membershipFilters');

/**
 * homeController class
 */
(function() {

    /**
     * Constructor.
     * @param {app} - express app.
     */
    function HomeController(app) {
        this.routes(app);
    }

    /**
     * Controller routes
     * @param  {express} app
     */
    HomeController.prototype.routes = function(app) {
        app.get('/', membershipFilters.authorize, this.index);
        app.get('/home', membershipFilters.authorize, this.index);
        app.get('/home/index', membershipFilters.authorize, this.index);
    };

    /**
     * [HttpGet].
     * index action
     * @param  {request} req
     * @param  {response} res
     */
    HomeController.prototype.index = function(req, res) {
        res.render('home/index');
    };

    module.exports = HomeController;
})();