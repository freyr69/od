/*

HumanizeDuration.js
http://git.io/j0HgmQ

*/

;(function() {

  // What are the languages?
  var LANGUAGES = {
    en: {
      year: function(c) { return "y"; },
      month: function(c) { return "mo"; },
      week: function(c) { return "w"; },
      day: function(c) { return "d"; },
      hour: function(c) { return "h"; },
      minute: function(c) { return "m"; },
      second: function(c) { return "s"; },
      millisecond: function(c) { return "ms"; }
    }
    
  };

  // Start by defining the units and how many ms is in each.
  var UNITS = [
    { name: "year", milliseconds: 31557600000 },
    { name: "month", milliseconds: 2629800000 },
    { name: "week", milliseconds: 604800000 },
    { name: "day", milliseconds: 86400000 },
    { name: "hour", milliseconds: 3600000 },
    { name: "minute", milliseconds: 60000 },
    { name: "second", milliseconds: 1000 },
    { name: "millisecond", milliseconds: 1 }
  ];

  // A utility function for creating the strings.
  // render(1, "minute") == "1 minute"
  // render(12, "hour") == "12 hours"
  // render(2, "hour", "es") == "2 horas"
  function render(count, word) {
    var dictionary = LANGUAGES['en'];
    return count + " " + dictionary[word](count);
  }

  // Grab the components.
  function componentsOf(total) {

    var result = { total: {} };
    var ms = total;

    var unit, unitName, unitTotal, unitCount;
    for (var i = 0, len = UNITS.length; i < len; i ++) {

      // Store the current unit.
      unit = UNITS[i];
      unitName = unit.name + "s";

      // What's the total?
      unitTotal = Math.floor(total / unit.milliseconds);
      result.total[unitName] = render(unitTotal, unit.name);

      // What's the rest?
      unitCount = Math.floor(ms / unit.milliseconds);
      result[unitName] = render(unitCount, unit.name);

      // Lower the number of milliseconds.
      ms -= unitCount * unit.milliseconds;

    }

    return result;

  }

  // The main function.
  function humanize(ms) {

    // Turn Number objects into primitives.
    if (ms instanceof Number)
      ms = ms.valueOf();

    // Humanizing zero, I see.
    if (ms === 0)
      return "0";

    // We'll put everything in an array and turn that into a string at the end.
    var result = [];

    // Start at the top and keep removing units, bit by bit.
    var unit, unitCount, mightBeHalfUnit;
    for (var i = 0, len = UNITS.length; (i < len) && (ms); i ++) {

      // Store the current unit.
      unit = UNITS[i];

      // If it's a half-unit interval, we're done.
      if (result.length === 0) {
        mightBeHalfUnit = (ms / unit.milliseconds) * 2;
        if (mightBeHalfUnit === Math.floor(mightBeHalfUnit))
          return render(mightBeHalfUnit / 2, unit.name);
      }

      // What's the number of full units we can fit?
      unitCount = Math.floor(ms / unit.milliseconds);

      // Add the string.
      if (unitCount)
        result.push(render(unitCount, unit.name));

      // Remove what we just figured out.
      ms -= unitCount * unit.milliseconds;

    }

    // All done! Turn the array into a string.
    return result.join(", ");

  }

  // Export this baby.
  humanize.componentsOf = componentsOf;
  if ((typeof module !== "undefined") && (module.exports))
    module.exports = humanize;
  else
    this.humanize = humanize;

})();
