/**
 * StatsController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
    /**
     * Action blueprints:
     *    `/stats/orgasm`
     */
    orgasm: function(req, res) {
        console.log("getting orgasm log");
        OrgasmLog.find().exec(function(err, log) {
            if (err) {
                console.log(err);
            } else {
                return res.view({
                    log: log
                });
            }
        });
    },
    /**
     * Action blueprints:
     *    `/stats/chastity`
     */
    chastity: function(req, res) {

        console.log("getting chastity log");
        ChastityLog.find().exec(function(err, log) {
            if (err) {
                console.log(err);
            } else {
                return res.view({
                    log: log
                });
            }
        });
    },
    /**
     * Action blueprints:
     *    `/stats/arousal`
     */
    arousal: function(req, res) {

        // Send a JSON response
        return res.json({
            hello: 'stats - arousal'
        });
    },
    /**
     * Action blueprints:
     *    `/stats/punishment`
     */
    punishment: function(req, res) {

        // Send a JSON response
        return res.json({
            hello: 'stats - punishments'
        });
    },
    /**
     * Action blueprints:
     *    `/stats/tease`
     */
    tease: function(req, res) {

        // Send a JSON response
        return res.json({
            hello: 'stats - teases'
        });
    },
    /**
     * Action blueprints:
     *    `/stats/task`
     */
    task: function(req, res) {

        // Send a JSON response
        return res.json({
            hello: 'stats - tasks'
        });
    },
    /**
     * Overrides for the settings in `config/controllers.js`
     * (specific to StatsController)
     */
    _config: {}


};
