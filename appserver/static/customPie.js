require([
  "splunkjs/mvc/chartview",
  "splunkjs/mvc",
  "splunkjs/mvc/simplexml/ready!"
], function(ChartView,mvc) {
  // Quick change of of default click behavior not the best Example

  // Function to rerun a search object with new search
  function runSearch(instanceName, search) {
    var searchInstance = mvc.Components.getInstance(instanceName);
    searchInstance.settings.set('search', search);
    searchInstance.startSearch();
  }

  var chart = mvc.Components.get('custom_char1');
  var clicks = 0;
  chart.on("click:chart", function (e) {
    // this is the chart object
    e.preventDefault(); // Prevent redirecting to the Search app
    var prev = { name: e.name,
                 value: e.value
                };
    switch (clicks) {
      case 0:
        this.settings.set('title', "Tickets assigned to " + e.value + " by category"); // update title
        var base1 = 'index=* sourcetype="servicenow" ' + e.name + '"'+ e.value + '"' + '| chart count by category';
        runSearch(this.managerid, base1 );
        break;
      case 1:
        this.settings.set('title', "Tickets assigned to " + prev.value + " in "+ prev.value + " category by assignment_user_name");
        var base2 = 'index=* sourcetype="servicenow" ' + prev.name + '"'+ prev.value + '" '  +
          e.name + '"'+ e.value + '"' + '| chart count by assignment_user_name'
        runSearch(this.managerid, base2 );
        break;
      default:
        break;
    }
    clicks++
  });
});