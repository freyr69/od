/**
 * TeaseLog
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {
    attributes: {
        teaseId: 'INTEGER',
        title: 'STRING',
        description: 'TEXT',
        severity: 'INTEGER',
        inChastity: 'BOOLEAN',
        start: 'DATETIME',
        end: 'DATETIME'
    }

};
