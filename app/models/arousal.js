module.exports = function(db, DataTypes) {

    var arousal = db.define('arousal', {
        date: DataTypes.DATE,
        level: DataTypes.INTEGER
    });

    return arousal;
};