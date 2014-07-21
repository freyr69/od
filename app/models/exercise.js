module.exports = function(db, DataTypes) {

    var exercise = db.define('exercise', {
        title: DataTypes.STRING,
        minSets: DataTypes.INTEGER,
        minReps: DataTypes.INTEGER
    });
    return exercise;
};