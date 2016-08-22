/**
 * Created by berniem on 8/21/16.
 */
define(function(require, exports, module) {
  var _ = require("underscore");
  var SimpleSplunkView = require("splunkjs/mvc/simplesplunkview");
  var mvc = require("splunkjs/mvc");
  //
  // All Additional JS modules
  //


  // Define the customclass view
  var Heatmaphourday = SimpleSplunkView.extend({
    className: "splunk-headmap-day-hour-chart",
    //
    // Custom VIZ options used in XML div data-options
    //
    options: {
      "managerid": null,
      "data": "preview"
    },

    output_mode: "json",

    initialize: function() {
      SimpleSplunkView.prototype.initialize.apply(this, arguments);

      // Set up resize callback.
      $(window).resize(_.debounce(_.bind(this._handleResize, this), 20));
    },
    // Handles Window Resizing
    _handleResize: function() {
      this.render();
    },

    createView: function() {
      return true;
    },

    // Making the data look how we want it to for updateView to do its job
    formatData: function(data) {
      //
      // formatData is used to massage data into a usable
      // structure for Data VIZ
      //
      var formattedData = [];


      return formattedData;
    },
    // update view as search finished
    updateView: function(viz, data) {
      //
      // ADD VIZ HERE
      //
    }
  });
  return Heatmaphourday;
});