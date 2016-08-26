
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
  var Async = splunkjs.Async;

  exports.getScheme = function () {
    var scheme = new Scheme("Mockaroo Poller");

    scheme.description = "Streams events containing a random Data from Mockaroo API.";
    scheme.useExternalValidation = true;
    scheme.useSingleInstance = true; // setting to false will only run once and require interval to be set.

    scheme.args = [
      new Argument({
        name: "url",
        dataType: Argument.dataTypeString,
        description: "Mockaroo url",
        requiredOnCreate: false,
        requiredOnEdit: false
      }),
      new Argument({
        name: "key",
        dataType: Argument.dataTypeString,
        description: "API Key",
        requiredOnCreate: true,
        requiredOnEdit: false
      })
    ];

    return scheme;
  };

  exports.streamEvents = function (name, singleInput, eventWriter, done) {
    Logger.info(name, "Starting Mockaroo");

    var working = true;

    // Async loop while no errors
    Async.whilst(
      function () {
        return working;
      },
      function (done) {
        // Fetch data  code here


      },
      function (err) {
        Logger.error(name, err);
        done();
      }
    );
  }

  ModularInputs.execute(exports, module);
})();