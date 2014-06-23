module.exports = function(db, DataTypes) {

    var orgasm = db.define('orgasm', {
        nextOrgasmDate: DataTypes.DATE
    });
    return orgasm;
};