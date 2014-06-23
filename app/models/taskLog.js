module.exports = function(db, DataTypes) {

    var taskLog = db.define('taskLog', {
        title: DataTypes.STRING,
        description: DataTypes.TEXT,
        severity: DataTypes.INTEGER,
        assigned: DataTypes.DATE,
        maxStart: DataTypes.DATE,
        maxEnd: DataTypes.DATE,
        start: DataTypes.DATE,
        end: DataTypes.DATE
    });
    return taskLog;
};