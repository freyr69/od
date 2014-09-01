var php = require('phpjs');
var _ = require('lodash');

(function () {

    function TaskUtil() {};

    TaskUtil.prototype.getSeverity = function () {
        return php.rand(1, 10);
    };


    TaskUtil.prototype.parseExpressions = function (msg, severity) {
        match = msg.match(/%%[^%]*%%/g);
        //console.log(match);
        if (match) {
            if (match.length > 0) {
                match.forEach(function (data) {
                    var m = data;
                    //console.log("original text = " + m);
                    data = data.replace(/%/g, "");
                    var c = data.split(',');
                    var method, multiplier = 1;
                    if (c[0]) {
                        method = c[0];
                    }
                    if (c[1]) {
                        multiplier = _.parseInt(c[1]);
                    }

                    //console.log('method = ' + method);
                    //console.log('multiplier = ' + multiplier);

                    var rval = "";
                    if (method === 'DATERANGE') {
                        rval = (php.rand(1, 24) * (severity * multiplier)) + " hours";
                    } else if (method === 'NUMBER') {
                        rval = severity * multiplier;
                    }

                    msg = msg.replace(m, rval);
                });
            }
        }

        return msg;
    };


    module.exports = TaskUtil;
})();