/**
 * OrgasmLog
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

var moment = require('moment');

module.exports = {

  attributes: {
    type: {
      type: 'INTEGER',
      required: true
    },
    date: {
      type: 'DATETIME',
      required: true
    },
    typeName: function() {
        if (this.type === 1) {
            return 'Masturbation';
        } else if (this.type === 2) {
            return 'Wet Dream';
        } else if (this.type === 3) {
            return 'Sex';
        } else {
            return 'Unknown';
        }
    },
    formattedDate: function() {
        return moment(this.date).format('MM/DD/YYYY HH:mm:ss');
    }
  }

};
