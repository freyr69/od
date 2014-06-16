/**
 * ChastityController
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
     *    `/chastity/index`
     */
    index: function(req, res) {
        ChastityLog.find({
            sort: 'start DESC',
            limit: 1
        }).exec(function(err, cdate) {
            if (err) {
                sails.log.warn(err);
                next(err, null);
            } else {
                sails.log.info("last chastity:", cdate);
                var inChastity = false;
                var lastDate = null;
                var startDate = null;
                if (cdate.length > 0) {
                    startDate = cdate[0].start;
                    lastDate = cdate[0].end;
                    if (lastDate === null) {
                        inChastity = true;
                    }
                }
                
                return res.view({
                    lastDate: DateService.convertDateToLocal(lastDate),
                    startDate: DateService.convertDateToLocal(startDate),
                    inChastity: inChastity
                });
            }
        });
    },
    /**
     * Action blueprints:
     *    `/chastity/start`
     */
    start: function(req, res) {
        ChastityLog.create({
            start: new Date()
        }).done(function(err, log) {
            return res.redirect('/chastity');
        });
    },
    /**
     * Action blueprints:
     *    `/chastity/stop`
     */
    stop: function(req, res) {
        ChastityLog.find({
            sort: 'start DESC',
            limit: 1
        }).exec(function(err, cdate) {
            if (err) {
                sails.log.warn(err);
                return res.redirect('/chastity');
            } else {
                if (cdate.length > 0) {
                    log = cdate[0];
                    if (log.end === null) {
                        log.end = new Date();
                        log.save(function(err) {
                            if (err) {
                                sails.log.warn(err);
                            }
                           return res.redirect('/chastity');
                        });
                    } else {
                        return res.redirect('/chastity');
                    }
                } else {
                    return res.redirect('/chastity');
                }
                
            }
            
        });
    },
    /**
     * Overrides for the settings in `config/controllers.js`
     * (specific to ChastityController)
     */
    _config: {}


};
