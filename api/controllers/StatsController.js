/**
 * StatsController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
    /**
     * Action blueprints:
     *    `/stats/orgasm`
     */
    orgasm: function(req, res) {
        OrgasmLog.find().exec(function(err, log) {
            if (err) {
                sails.log.error(err);
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
        ChastityLog.find().exec(function(err, log) {
            if (err) {
                sails.log.error(err);
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
        Arousal.find().exec(function(err, log) {
            if (err) {
                sails.log.error(err);
            } else {
                return res.view({
                    log: log
                });
            }
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
