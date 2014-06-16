/**
 * Arousal
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

var moment = require('moment');

module.exports = {
    attributes: {
        date: 'DATETIME',
        level: 'INTEGER',
        formattedDate: function() {
            return moment(this.date).format('MM/DD/YYYY HH:mm:ss');
        }
    }

};
