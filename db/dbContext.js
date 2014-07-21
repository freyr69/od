/**
 * DbContext class
 */
(function() {

    var modelsPath = __dirname + '/../app/models/';

    /**
     * Constructor.
     */
    function DbContext() {
        this.db = require('./dbConnection');
        this.entities();
        this.modelBuilder();
    }

    /**
     * Attach your model to DbContext like user to perform database sync.
     * 
     */
    DbContext.prototype.entities = function() {
        this.user = this.db.import(modelsPath + 'user');
        this.arousal = this.db.import(modelsPath + 'arousal');
        this.chastityLog = this.db.import(modelsPath + 'chastityLog');
        this.orgasm = this.db.import(modelsPath + 'orgasm');
        this.orgasmLog = this.db.import(modelsPath + 'orgasmLog');
        this.punishment = this.db.import(modelsPath + 'punishment');
        this.punishmentLog = this.db.import(modelsPath + 'punishmentLog');
        this.task = this.db.import(modelsPath + 'task');
        this.taskLog = this.db.import(modelsPath + 'taskLog');
        this.tease = this.db.import(modelsPath + 'tease');
        this.teaseLog = this.db.import(modelsPath + 'teaseLog');
        this.food = this.db.import(modelsPath + 'food');
        this.foodLog = this.db.import(modelsPath + 'foodLog');
        this.exercise = this.db.import(modelsPath + 'exercise');
        this.exerciseLog = this.db.import(modelsPath + 'exerciseLog');
    };

    /**
     * Manage Database entities associations here.
     */
    DbContext.prototype.modelBuilder = function() {
    };

    module.exports = DbContext;
})();
