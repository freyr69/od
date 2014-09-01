module.exports = function(db, DataTypes) {

    var variable = db.define('variable', {
        name: DataTypes.STRING,
        value: DataTypes.TEXT
    });
    return variable;
}