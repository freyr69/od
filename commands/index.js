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
    sendArousalNotification: function(done) {
        var later = require('later');
        var moment = require('moment');
        var PushBullet = require('pushbullet');
        var pusher = new PushBullet('v1Mc0siAtzdNSpEpOxsy13LYqAxPciDKSAujvgJegjHUa');

        later.date.localTime();
        //var sched = later.parse.text('every 1 hour between 10 am and 10 pm');
        //var sched = later.parse.recur().on(10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22).hour();
        var sched = later.parse.text('every 1 min');
        //console.log(later.schedule(sched).next(10));

        var count = 12;
        var t = later.setInterval(pushItGood, sched);

        function pushItGood() {
            
            console.log("Sending checkin link...");
            
            var link = 'http://localhost:1337/arousal';

            //var deviceIden = 'ujvgJegjHUadjxmRBQTeEu'; // iphone
            var deviceIden = 'ujvgJegjHUadjAsoeMFET6'; // chrome
            pusher.link(deviceIden, 'Time to check in...', link, function(err, res) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(res);
                }
                count--;
                if (count <=0) {
                    t.clear();
                    done();
                }
            });
        }
    },
    listDevices: function(done) {
        var PushBullet = require("pushbullet");
        var pusher = new PushBullet('v1Mc0siAtzdNSpEpOxsy13LYqAxPciDKSAujvgJegjHUa');

        pusher.devices(function(err, res) {
            if (err) {
                console.log(err);
            } else {
                console.log(res);
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
        pusher.link(deviceIden, 'Time to start some chastity...', 'http://devel.diybdsm.com/days/chastity/', function(err, res) {
            if (err) {
                console.log(err);
            } else {
                console.log(res);
            }
            done();
        });
    }
};