module.exports = function(db, DataTypes) {

    var teaseLog = db.define('teaseLog', {
        title: DataTypes.STRING,
        description: DataTypes.TEXT,
        severity: DataTypes.INTEGER,
        inChastity: DataTypes.BOOLEAN,
        start: DataTypes.DATE,
        end: DataTypes.DATE
    });
    return teaseLog;
};