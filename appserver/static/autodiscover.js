/**
 * Created by berniem on 8/22/16.
 */
//  This script has been borrowed from the simple_xml_examples
//  Download app form splunkbase @ https://splunkbase.splunk.com/app/1603/
require.config({
  paths: {
    "app": "../app"
  }
});
require(['splunkjs/mvc/simplexml/ready!'], function(){
  require(['splunkjs/ready!'], function(){
    // The splunkjs/ready loader script will automatically instantiate all elements
    // declared in the dashboard's HTML.
  });
});