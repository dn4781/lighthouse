/**
 * @license Copyright 2019 The Lighthouse Authors. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */
'use strict';

const TBTAudit = require('../../../audits/metrics/total-blocking-time.js');
const options = TBTAudit.defaultOptions;

const pwaTrace = require('../../fixtures/traces/progressive-app-m60.json');

function generateArtifactsWithTrace(trace) {
  return {
    traces: {[TBTAudit.DEFAULT_PASS]: trace},
    devtoolsLogs: {[TBTAudit.DEFAULT_PASS]: []},
  };
}
/* eslint-env jest */

describe('Performance: total-blocking-time audit', () => {
  it('evaluates Total Blocking Time metric properly', async () => {
    const artifacts = generateArtifactsWithTrace(pwaTrace);
    const settings = {throttlingMethod: 'provided'};
    const context = {options, settings, computedCache: new Map()};
    const output = await TBTAudit.audit(artifacts, context);

    expect(output.numericValue).toBeCloseTo(48.3, 1);
    expect(output.score).toBe(1);
    expect(output.displayValue).toBeDisplayString('50\xa0ms');
  });
});
