/**
 * Created by berniem on 8/21/16.
 */
require(["underscore",
    "jquery",
    "splunkjs/mvc",]
  , function(_, $, mvc) {
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


      //  Creates onclick event for div class groupname
      $('.dashboard-body').on('click', 'a.button.button-primary', function() {
        var team = $(this).text();
        setToken('team', team);
      });
    })();
  });
