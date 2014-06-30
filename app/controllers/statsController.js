
var OrgasmLogDAL = require('../dal/orgasmLogDAL');
var ChatityLogDAL = require('../dal/chastityLogDAL');
var ArousalDAL = require('../dal/arousalDAL');

var _ = require('lodash');
var moment = require('moment');

/**
* statsController class
*/
(function () {

    var orgasmDAL = new OrgasmLogDAL();
    var chastityDAL = new ChatityLogDAL();
    var arousalDAL = new ArousalDAL();

    /**
    * Constructor.
    * @param {app} - express app.
    */
    function statsController(app) {
        this.routes(app);
    }

    /**
     * Controller routes
     * @param  {express} app
     */
    statsController.prototype.routes = function(app) {
        
        app.get('/stats', this.orgasm);
        
        app.get('/stats/orgasm', this.orgasm);
         
        app.get('/stats/chastity', this.chastity);
         
        app.get('/stats/arousal', this.arousal);
         
        app.get('/stats/punishment', this.punishment);
         
        app.get('/stats/task', this.task);
         
        app.get('/stats/tease', this.tease);
         
        
    };


 
    /**
     * [HttpGet].
     * orgasm action
     * @param  {request} req
     * @param  {response} res
     */
    statsController.prototype.orgasm = function(req, res) {
        orgasmDAL.getAll(function(data) {
            res.render('stats/orgasm', {data: data, '_': _, 'moment': moment});
        });
    };
 
    /**
     * [HttpGet].
     * chastity action
     * @param  {request} req
     * @param  {response} res
     */
    statsController.prototype.chastity = function(req, res) {
        chastityDAL.getAll(function(data) {
            res.render('stats/chastity', {data: data, '_': _, 'moment': moment});
        });
    };
 
    /**
     * [HttpGet].
     * arousal action
     * @param  {request} req
     * @param  {response} res
     */
    statsController.prototype.arousal = function(req, res) {
        arousalDAL.getAll(function(data) {
            res.render('stats/arousal', {data: data, '_': _, 'moment': moment});
        });
    };
 
    /**
     * [HttpGet].
     * punishment action
     * @param  {request} req
     * @param  {response} res
     */
    statsController.prototype.punishment = function(req, res) {
        res.render('stats/punishment');
    };
 
    /**
     * [HttpGet].
     * task action
     * @param  {request} req
     * @param  {response} res
     */
    statsController.prototype.task = function(req, res) {
        res.render('stats/task');
    };
 
    /**
     * [HttpGet].
     * tease action
     * @param  {request} req
     * @param  {response} res
     */
    statsController.prototype.tease = function(req, res) {
        res.render('stats/tease');
    };
 


    module.exports = statsController;
})();