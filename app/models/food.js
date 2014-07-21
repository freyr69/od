module.exports = function(db, DataTypes) {

    var food = db.define('food', {
        title: DataTypes.STRING,
        points: DataTypes.INTEGER
    });
    return food;
};