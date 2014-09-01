var php = require('phpjs');
var _ = require('lodash');

(function () {

    

    function PenisUtil() {};
    
    PenisUtil.prototype.averages = {
        overall: {
            'erectLength': 6.45,
            'erectGirth': 5.23,
            'flacidLength': 4.01,
            'flacidGirth': 4.17
        },
        modest: {
            'erectLength': 4.72,
            'erectGirth': 4.33,
            'flacidLength': 2.91,
            'flacidGirth': 3.46
        },
        large: {
            'erectLength': 7.48,
            'erectGirth': 5.98,
            'flacidLength': 4.64,
            'flacidGirth': 4.8
        },
        black: {
            'erectLength': 6.93,
            'erectGirth': 5.39,
            'flacidLength': 4.29,
            'flacidGirth': 4.33
        }
    };
    
    PenisUtil.prototype.userPenisData;

    PenisUtil.prototype.setUserPenisData = function (userPenisData) {
        this.userPenisData = userPenisData;
    };

    PenisUtil.prototype.getClassification = function () {

        var data = [
            this.getVolume(this.averages.modest.erectLength, this.averages.modest.erectGirth),
            this.getVolume(this.averages.overall.erectLength, this.averages.overall.erectGirth),
            this.getVolume(this.averages.large.erectLength, this.averages.large.erectGirth)
        ];

        var closest = this.getClosest(data, this.getVolume(this.userPenisData.erectLength, this.userPenisData.erectGirth));

        if (closest = data[0]) return 'modest';
        if (closest = data[1]) return 'average';
        if (closest = data[2]) return 'large';
        return "unknown";
    };

    PenisUtil.prototype.getErectDetails = function () {};

    PenisUtil.prototype.getFlacidDetails = function () {};

    PenisUtil.prototype.calculateAll = function () {
        var data = {
            overall: this.calculate(this.averages.overall),
            modest: this.calculate(this.averages.modest),
            large: this.calculate(this.averages.large),
            black: this.calculate(this.averages.black)
        };

        return data;
    };

    PenisUtil.prototype.getClosest = function (array, num) {
        var closest = array.reduce(function (prev, curr) {
            return (Math.abs(curr - num) < Math.abs(prev - num) ? curr : prev);
        });

        return closest;
    };

    PenisUtil.prototype.getVolume = function (length, girth) {
        return php.round(length * Math.pow((girth / 2 / Math.PI), 2) * Math.PI, 2);
    };

    PenisUtil.prototype.calculate = function(averageData) {
        console.log("calculating for ", averageData);
        console.log("UserData:  ", this.userPenisData);
        
        var slaveErectVolume = this.getVolume(this.userPenisData.erectLength, this.userPenisData.erectGirth);
        var averageErectVolume = this.getVolume(averageData.erectLength, averageData.erectGirth);
        var slaveFlacidVolume = this.getVolume(this.userPenisData.flacidLength, this.userPenisData.flacidGirth);
        var averageFlacidVolume = this.getVolume(averageData.flacidLength, averageData.flacidGirth);

        var data = {
            'erectLength': {
                'slave': this.userPenisData.erectLength,
                'average': averageData.erectLength,
                'percent': Math.ceil((this.userPenisData.erectLength / averageData.erectLength) * 100)
            },
            'erectGirth': {
                'slave': this.userPenisData.erectGirth,
                'average': averageData.erectGirth,
                'percent': Math.ceil((this.userPenisData.erectGirth / averageData.erectGirth) * 100)
            },
            'erectVolume': {
                'slave': slaveErectVolume,
                'average': averageErectVolume,
                'percent': Math.ceil((slaveErectVolume / averageErectVolume) * 100)
            },
            'flacidLength': {
                'slave': this.userPenisData.flacidLength,
                'average': averageData.flacidLength,
                'percent': Math.ceil((this.userPenisData.flacidLength / averageData.flacidLength) * 100)
            },
            'flacidGirth': {
                'slave': this.userPenisData.flacidGirth,
                'average': averageData.flacidGirth,
                'percent': Math.ceil((this.userPenisData.flacidGirth / averageData.flacidGirth) * 100)
            },
            'flacidVolume': {
                'slave': slaveFlacidVolume,
                'average': averageFlacidVolume,
                'percent': Math.ceil((slaveFlacidVolume / averageFlacidVolume) * 100)
            }
        };

        return data;
    };




    module.exports = PenisUtil;
})();