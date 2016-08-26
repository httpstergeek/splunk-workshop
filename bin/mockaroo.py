#!/usr/bin/env python
# coding=utf-8
#
# Copyright © 2011-2015 Splunk, Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License"): you may
# not use this file except in compliance with the License. You may obtain
# a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
# WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
# License for the specific language governing permissions and limitations
# under the License.

from splunklib.searchcommands import dispatch, GeneratingCommand, Configuration, Option, validators
import sys
from helpers import *
import time

@Configuration()
class MockarooCommand(GeneratingCommand):

    events = Option(require=True, validate=validators.Integer(0))

    def generate(self):
        self.logger.debug('CountMatchesCommand: %s', self)  # logs command line
        searchinfo = self.metadata.searchinfo
        app = AppConf(searchinfo.splunkd_uri, searchinfo.session_key)
        conf = app.get_config('mockaroo')
        event = {}
        event.update(conf.copy())
        event['sid'] = searchinfo.sid
        event['username'] = searchinfo.username
        event['session_key'] = searchinfo.session_key
        event['latest_time'] = searchinfo.latest_time
        event['earliest_time'] = searchinfo.earliest_time
        event['search'] = searchinfo.search
        event['owner'] = searchinfo.owner
        event['command'] = searchinfo.command
        event['splunk_version'] = searchinfo.splunk_version
        event['splunkd_uri'] = searchinfo.splunkd_uri
        event['dispatch_dir'] = searchinfo.dispatch_dir
        event['_raw'] = json.dumps(event)
        # event.pop('mockaroo')
        # event.update(dictexpand(conf))
        for i in range(1, self.events + 1):
            event['_serial'] = i
            event['_time'] = time.time()
            yield event

dispatch(MockarooCommand, sys.argv, sys.stdin, sys.stdout, __name__)