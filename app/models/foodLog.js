module.exports = function(db, DataTypes) {

    var foodLog = db.define('foodLog', {
        date: DataTypes.DATE
    });
    return foodLog;
};