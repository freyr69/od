/**
 * ChastityController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
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
