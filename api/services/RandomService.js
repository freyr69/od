var moment = require('moment');

exports.between = function(min, max, next) {
    var rand = Math.floor(Math.random() * (max - min + 1) + min);
    next(null, rand);
};