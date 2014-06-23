module.exports = function(db, DataTypes) {

    var task = db.define('task', {
        title: DataTypes.STRING,
        description: DataTypes.TEXT,
        schedule: DataTypes.STRING,
        minDuration: DataTypes.INTEGER,
        maxDuration: DataTypes.INTEGER
    });
    return task;
};