module.exports = function(db, DataTypes) {

    var punishment = db.define('punishment', {
        title: DataTypes.STRING,
        description: DataTypes.TEXT,
        minDuration: DataTypes.INTEGER,
        maxDuration: DataTypes.INTEGER
    });
    return punishment;
};