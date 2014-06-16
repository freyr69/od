/**
 * ArousalController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
    /**
     * Action blueprints:
     *    `/arousal/index`
     */
    index: function(req, res) {

        Arousal.find({
            sort: 'date DESC',
            limit: 1
        }).exec(function(err, level) {
            if (err) {
                sails.log.error(err);
            } else {
                return res.view({
                    level: level[0].level,
                    date: level[0].date
                });
            }
        });


    },
    /**
     * Action blueprints:
     *    `/arousal/log`
     */
    log: function(req, res) {
        var level = req.param('id');
        if (level === null) {
            level = 1;
        }
        if (level < 1) {
            level = 1;
        }
        if (level > 5) {
            level = 5;
        }

        Arousal.create({
            date: new Date(),
            level: level
        }).done(function(err, log) {
            return res.redirect('/arousal');
        });
    },
    /**
     * Overrides for the settings in `config/controllers.js`
     * (specific to ArousalController)
     */
    _config: {}


};
