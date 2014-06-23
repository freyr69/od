module.exports = function(db, DataTypes) {

    var punishmentLog = db.define('punishmentLog', {
        title: DataTypes.STRING,
        description: DataTypes.TEXT,
        severity: DataTypes.INTEGER,
        assigned: DataTypes.DATE,
        maxStart: DataTypes.DATE,
        maxEnd: DataTypes.DATE,
        start: DataTypes.DATE,
        end: DataTypes.DATE
    });
    return punishmentLog;
};