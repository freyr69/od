/**
 * PunishmentLog
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
    punishmentId: 'INTEGER',
    assigned: 'DATETIME',
    maxStart: 'DATETIME',
    maxEnd: 'DATETIME',
    start: 'DATETIME',
    end: 'DATETIME'	
  }

};
