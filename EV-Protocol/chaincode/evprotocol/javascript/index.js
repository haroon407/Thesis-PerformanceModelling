/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const EVProtocol = require('./lib/evprotocol');
const ChargeProvider = require('./lib/chargeProvider');

module.exports.EVProtocol = EVProtocol;
module.exports.ChargeProvider = ChargeProvider;
module.exports.contracts = [ EVProtocol, ChargeProvider ];
