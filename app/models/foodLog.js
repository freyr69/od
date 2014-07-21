module.exports = function(db, DataTypes) {

    var foodLog = db.define('foodLog', {
        title: DataTypes.STRING,
        points: DataTypes.INTEGER,
        date: DataTypes.DATE
    });
    return foodLog;
};