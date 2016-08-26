/**
 * Created by berniem on 8/21/16.
 */
require(["underscore",
    "jquery",
    "splunkjs/mvc/datatemplateview",
    "splunkjs/mvc",]
  , function(_, $, DataTemplateView, mvc) {
    (function() {

      //function to set tokens
      function setToken(name, value) {
        "use strict";
        var defaultTokenModel = mvc.Components.get('default');
        if (defaultTokenModel) {
          defaultTokenModel.set(name, value);
        }
        var submittedTokenModel = mvc.Components.get('submitted');
        if (submittedTokenModel) {
          submittedTokenModel.set(name, value);
        }
      }

      // Function to rerun a search
      function runSearch(instanceName) {
        "use strict";
        var searchInstance = mvc.Components.getInstance(instanceName);
        var dispatchState = searchInstance.settings['attributes']['data']['isDone'];
        if(dispatchState == true) {
          searchInstance.startSearch();
        }
      }

      // Attaching search reload when dashboard-body ready and using event
      // delegation to bind click events
      $('.dashboard-body').ready(function() {
        // Reloads base searches on 5min interval
        setInterval(function(){
          runSearch('mttr');
          runSearch('openIncidents');
        }, 300000);
      }).on('click', 'a.button.button-primary', function() {
        var team = $(this).text();
        setToken('team', team);
      });


      //Building html with Underscore Template with Command Search Tokens
      var tableTemplate = '<h3>Open Tickets</h3>' +
        '<table class=\"pure-table\">' +
        '<thead>' +
        '<tr>' +
        '<th>Member</th>' +
        '<th>Count</th>' +
        '</tr>' +
        '</thead>' +
        '<tbody>' +
        '<% for(var i=0, l=results.length; i<l; i++) { ' +
        'var line=results[i]; var hlight="pure-table-even"; ' +
        'if(i%2){hlight = "pure-table-odd"};  %>' +
        '<tr class="<%= hlight %>"><td><%= line.assignment_user_username %></td><td><%= line.count %></td></tr>' +
        '<% } %>' +
        '</tbody>' +
        '</table>';

      // Getting default tokens and template
      var defaultTokenModel = mvc.Components.get('default');

      // Listening to team token change
      defaultTokenModel.on("change:team", function() {
        // checking if dataTemplate exists
        var dataTemplate = mvc.Components.get('open-items')
        if (dataTemplate === undefined) {
          // Instantiate DataTemplate
          new DataTemplateView({
            id: "open-items",
            managerid: "open",
            template: tableTemplate,
            el: $("#datatemplate")
          }).render();
        } else {
          runSearch('open');
        }
      });

    })();
  });