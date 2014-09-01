module.exports = function (db, DataTypes) {
    var health = db.define('health', {
        date: DataTypes.DATE,
        weight: DataTypes.TEXT,
        bodyFat: DataTypes.TEXT,
        waist: DataTypes.TEXT,
        chest: DataTypes.TEXT,
        hips: DataTypes.TEXT,
        thigh: DataTypes.TEXT,
        calf: DataTypes.TEXT,
        upperArm: DataTypes.TEXT,
        forearm: DataTypes.TEXT,
        neck: DataTypes.TEXT,
    });
    return health;
}