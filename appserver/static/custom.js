/**
 * Created by berniem on 8/21/16.
 */
require(["underscore",
    "jquery",
    "splunkjs/mvc/datatemplateview",
    "splunkjs/mvc",]
  , function(_, $, DataTemplateView, mvc) {
    (function() {

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

      function runSearch(instanceName) {
        "use strict";
        var searchInstance = mvc.Components.getInstance(instanceName);
        var dispatchState = searchInstance.settings['attributes']['data']['isDone'];
        if(dispatchState == true) {
          searchInstance.startSearch();
        }
      }

      // Reloads base searches on 5min interval
      $('.dashboard-body').ready(function() {
        setInterval(function(){
          runSearch('mttr');
          runSearch('openIncidents');
        }, 300000);
      });

      //  Creates onclick event for div class groupname
      $('.dashboard-body').on('click', 'a.button.button-primary', function() {
        var team = $(this).text();
        setToken('team', team);
      });


      var tableTemplate = '<table class=\"pure-table\">' +
        '<thead>' +
        '<tr>' +
        '<th>Member</th>' +
        '<th>Count</th>' +
        '</tr>' +
        '</thead>' +
        '<tbody>' +
        '<% for(var i=0, l=results.length; i<l; i++) { var line=results[i]; var hlight="pure-table-even"; if(i%2){hlight = "pure-table-odd"};  %>' +
        '<tr class="<%= hlight %>"><td><%= line.assignment_user_username %></td><td><%= line.count %></td></tr>' +
        '    <% } %>' +
        '</tbody>' +
        '</table>'
      var defaultTokenModel = mvc.Components.get('default');

      defaultTokenModel.on("change:team", function(team) {
        // Instantiate DataTemplate
        new DataTemplateView({
          id: "open-data",
          managerid: "open",
          template: tableTemplate,
          el: $("#datatemplate")
        }).render();
      });

    })();
  });