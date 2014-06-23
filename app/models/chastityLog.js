module.exports = function(db, DataTypes) {

    var chastityLog = db.define('chastityLog', {
        start: DataTypes.DATE,
        end: DataTypes.DATE
    });

    return chastityLog;
};