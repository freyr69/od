/**
 * OrgasmController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var async = require('async');
var moment = require('moment');

module.exports = {
    /**
     * Action blueprints:
     *    `/orgasm/index`
     */
    index: function(req, res) {

        async.parallel({
            next: function(callback) {
                OrgasmService.getNextOrgasmDate(callback);
            },
            last: function(callback) {
                OrgasmService.getPreviousOrgasmDate(callback);
            }
        },
        function(err, result) {
            if (err) {
                sails.log.error(err);
            } else {
                var days = moment(result.next).diff(moment(), 'days');
                var total = moment(result.next).diff(moment(result.last), 'days');
                var offset = moment().diff(moment(result.last), 'days');
                var pct = Math.round((offset/total) * 100);
                return res.view({
                    lastDate: result.last,
                    nextDate: result.next,
                    days: days,
                    total: total,
                    pct: pct
                });
            }
        }
        );
    },
    /**
     * Action blueprints:
     *    `/orgasm/log`
     */
    log: function(req, res) {

        var type = req.param('id');
        if (type === null) {
            type = 1; // default to masturbation...
        }

        async.parallel({
            newOrgasmDate: function(callback) {
                // Generate a new next date
                OrgasmService.updateOrgasmDate(type, callback);
            },
            logEntry: function(callback) {
                OrgasmService.logOrgasm(type, callback);
            }
        }, function(err, results) {
            sails.log.info('Logging orgasm', results);
            return res.redirect('/');
        });

    },
    /**
     * Overrides for the settings in `config/controllers.js`
     * (specific to OrgasmController)
     */
    _config: {}


};
