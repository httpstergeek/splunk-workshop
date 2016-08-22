/**
 * Created by berniem on 8/22/16.
 */
/**
 * Created by berniem on 4/6/16.
 */

define(function(require, exports, module) {
  var _ = require("underscore");
  var SimpleSplunkView = require("splunkjs/mvc/simplesplunkview");
  var mvc = require("splunkjs/mvc");
  //
  // All Additional JS modules
  //

  // Define the customclass view
  var Mapcolorbrewer = SimpleSplunkView.extend({
    className: "splunk-map-color-brew",
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
    formatData: function(data) {
      //
      // formatData is used to massage data into a usable
      // structure for Data VIZ
      //
      var formattedData = [];


      return formattedData;
    },
    updateView: function(viz, data) {
      //
      // ADD VIZ HERE
      //

    }
  });
  return Mapcolorbrewer;
});