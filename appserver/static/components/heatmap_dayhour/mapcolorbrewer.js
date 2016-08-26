/**
 * Created by berniem on 8/22/16.
 */
/**
 * Created by berniem on 4/6/16.
 * Color mapcolorbrewer borrowed from http://colorbrewer2.org/; colors by Cynthia Brewer
 */

define(function(require, exports, module) {
  var _ = require("underscore");
  var $ = require("jquery");
  var SimpleSplunkView = require("splunkjs/mvc/simplesplunkview");
  var mvc = require("splunkjs/mvc");
  var d3 = require("../d3/d3");
  var colorbrewer = require("../d3/colorbrewer");
  var css = require("css!./mapcolorbrewer.css");

  // Define the customclass view
  var Mapcolorbrewer = SimpleSplunkView.extend({
    className: "splunk-map-color-brew",
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
      formattedData.push(data); // Data not used but used to ticket viz to rendering
      return formattedData;
    },
    updateView: function(viz, data) {
      //
      // ADD VIZ HERE
      //
      this.$el.html(""); // Clears waiting for Data
      var id = this.id;
      d3.select("#"+id)
        .selectAll(".palette")
        .data(d3.entries(colorbrewer))
        .enter().append("span")
        .attr("class", "palette")
        .attr("title", function(d) { return d.key; })
        .text(function(d) {
          var x = colorbrewer[d.key];
          var b = _.map(x, function(num){return num.length});
          var max = Math.max.apply(Math, b);
          var min = Math.min.apply(Math, b);
          return d.key+": "+ min + "-"+ max; })
        .on("click", function(d) { console.log(d3.values(d.value).map(JSON.stringify).join("\n")); })
        .selectAll(".swatch")
        .data(function(d) { return d.value[d3.keys(d.value).map(Number).sort(d3.descending)[0]]; })
        .enter().append("span")
        .attr("class", "swatch")
        .style("margin", "0 auto")
        .style("background-color", function(d) { return d; });
    }
  });
  return Mapcolorbrewer;
});