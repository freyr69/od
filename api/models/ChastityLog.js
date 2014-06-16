/**
 * ChastityLog
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 * 
 */

var moment = require('moment');
hd = require('../../lib/humanize');

module.exports = {
    attributes: {
        start: 'DATETIME',
        end: 'DATETIME',
        formattedStart: function() {
            return moment(this.start).format('MM/DD/YYYY HH:mm:ss');
        },
        formattedEnd: function() {
            return moment(this.end).format('MM/DD/YYYY HH:mm:ss');
        },
        duration: function() {
            var diff = moment(this.end).diff(moment(this.start));
            return hd(diff);
        }
    }
};
