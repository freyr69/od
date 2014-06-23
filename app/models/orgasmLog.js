module.exports = function(db, DataTypes) {

    var orgasmLog = db.define('orgasmLog', {
        type: DataTypes.INTEGER,
        date: DataTypes.DATE
    });
    return orgasmLog;
};