/**
 * Created by berniem on 8/21/16.
 */
define(function(require, exports, module) {
  var _ = require("underscore");
  var $ = require("jquery");
  var d3 = require("../d3/d3");
  var colorbrewer = require("../d3/colorbrewer");
  var SimpleSplunkView = require("splunkjs/mvc/simplesplunkview");
  var mvc = require("splunkjs/mvc");
  var css = require("css!./heatmap_dayhour.css");

  // Define the customclass view
  var Heatmaphourday = SimpleSplunkView.extend({
    className: "splunk-headmap-day-hour-chart",
    //
    // Custom VIZ options used in XML div data-options
    //
    options: {
      "managerid": null,
      "data": "preview",
      "gridSize": 24,
      "height": 450,
      "time": "_time",
      "valueField": "value",
      "colorbrewPalette": "Paired",
      "paletteNumber": 12
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
      var formattedData = [];
      var timestamp = this.settings.get('time');
      var valueField = this.settings.get('valueField');
      data.map(function(d) {
        formattedData.push(
          {
            time: Number(new Date(d[timestamp]).getHours()) || 0,
            day: Number(new Date(d[timestamp]).getDate()) || 0,
            value: Number(d[valueField]) || 0
          }
        )

      });


      return formattedData;
    },
    // update view as search finished
    updateView: function(viz, data) {
      this.$el.html("");
      var id = this.id;
      $("#"+id).append("<p>"+ JSON.stringify(data,null, '  ') +"</p>")

    }
  });
  return Heatmaphourday;
});