module.exports = {
    listOrgasms: function(done) {
        OrgasmLog.find().exec(function(err, olog) {
            //console.log("oolog:  ", oolog);
            if (err) {
                console.log(err);
            } else {
                console.log(olog);
            }
            done();
        });
    },
    
    pushTest: function(done) {
        var moment = require('moment');
        var PushBullet = require("pushbullet");
        var pusher = new PushBullet('v1Mc0siAtzdNSpEpOxsy13LYqAxPciDKSAujvgJegjHUa');
        /*
        pusher.devices(function(err, res) {
            if (err) {
                console.log(err);
            } else {
                console.log(res);
            }
            done();
        });
        */
       
       var deviceIden = 'ujvgJegjHUadjxmRBQTeEu';
       //pusher.note(deviceIden, 'This is a test', 'This is a test on ' + moment(), function(err, res) {
       pusher.link(deviceIden, 'Time to start some chastity...', 'http://devel.diybdsm.com/days/chastity/', function(err, res){
           if (err) {
               console.log(err);
           } else {
               console.log(res);
           }
           done();
       });
    }
};