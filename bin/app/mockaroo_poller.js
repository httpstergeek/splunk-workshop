
//
// Created by berniem on 11/18/15.
//
// Licensed under the Apache License, Version 2.0 (the "License"): you may
// not use this file except in compliance with the License. You may obtain
// a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
// License for the specific language governing permissions and limitations
// under the License.
(function () {
  var splunkjs = require("splunk-sdk");
  var http = require('http');
  var ModularInputs = splunkjs.ModularInputs;
  var Logger = ModularInputs.Logger;
  var Event = ModularInputs.Event;
  var Scheme = ModularInputs.Scheme;
  var Argument = ModularInputs.Argument;

  exports.getScheme = function () {
    var scheme = new Scheme("Mockaroo Poller");

    scheme.description = "Streams events containing a random Data from Mockaroo API.";
    scheme.useExternalValidation = true;
    scheme.useSingleInstance = false;

    scheme.args = [
      new Argument({
        name: "endpoint",
        dataType: Argument.dataTypeString,
        description: "Mockaroo endpoint",
        requiredOnCreate: false,
        requiredOnEdit: false
      }),
      new Argument({
        name: "key",
        dataType: Argument.dataTypeString,
        description: "API Key",
        requiredOnCreate: true,
        requiredOnEdit: false
      }),
      new Argument({
        name: "port",
        dataType: Argument.dataTypeNumber,
        description: "port",
        requiredOnCreate: true,
        requiredOnEdit: false
      })
    ];

    return scheme;
  };

  exports.streamEvents = function (name, singleInput, eventWriter, done) {
    Logger.info(name, "Starting Mockaroo");
    var endpoint = singleInput.endpoint;
    var key = singleInput.key;
    var port = singleInput.port;
    var path = '/ea857240/download?count=100&key=' + key ;
    var httpParams = {
      host: endpoint,
      port: Number(port),
      path: path,
      agent: false
    };

    // Creating http Get request
    http.get(httpParams, function (res) {
      var body = [];

      res.on('data', function(data) {

        body.push(data);

      }).on('end', function() {

        body = Buffer.concat(body).toString();
        var events = JSON.parse(body);

        for (var i = 0; i < events.length; i++) {
          // Creating Splunk Event
          var curEvent = new Event({
            source: 'mockaroo_poller',
            sourcetype: 'mockaroo',
            data: events[i]
          });
          // Attempt to write event to Splunk
          try {
            eventWriter.writeEvent(curEvent);
          }
          catch (e) {
            Logger.error(name, 'failed to write event to Splunk');
          }
        }

        done();
      }).on('error', function (e) {

        Logger.error(name, 'request Failed: ' + e);
        done(e);

      });

    });
  };

  ModularInputs.execute(exports, module);
})();