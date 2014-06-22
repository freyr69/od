var Waterline = require('waterline');


var orm = new Waterline();
var arousalDef = require('./api/models/Arousal.js');


var mysqlAdapter = require('sails-mysql');

var config = {
    adapters: {
        'default': mysqlAdapter,
        mysql: mysqlAdapter
    },
    connections: {
        localMysql: {
            adapter: 'mysql',
            schema: true,
            host: 'localhost',
            user: 'root',
            password: 'root', 
            database: 'od',
            timezone: '+0000'
        }
    }
};

arousalDef.identity = 'arousal';
arousalDef.connection = 'localMysql';
console.log(arousalDef);


var Arousal = Waterline.Collection.extend(arousalDef);


orm.loadCollection(Arousal);
orm.initialize(config, function(err, models) {
    if (err) {
        console.log(err);
    }
    
    models.collections.arousal.find().exec(function(err, model) {
        console.log(model);
    });
    
});


//Arousal.find({}).exec(function(err, model){
//    console.log(model);
//});