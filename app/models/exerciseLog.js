module.exports = function(db, DataTypes) {

    var exerciseLog = db.define('exerciseLog', {
        title: DataTypes.STRING,
        sets: DataTypes.INTEGER,
        reps: DataTypes.INTEGER,
        start: DataTypes.DATE,
        end: DataTypes.DATE
    });
    return exerciseLog;
};