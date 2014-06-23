module.exports = function(db, DataTypes) {

    var tease = db.define('tease', {
        title: DataTypes.STRING,
        description: DataTypes.TEXT,
        allowChastity: DataTypes.BOOLEAN
    });
    return tease;
};