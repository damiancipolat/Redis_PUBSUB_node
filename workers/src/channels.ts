//To fix TS-global-scope error.
export {};

import type { 
  channelMapType
} from "./types";

const {
  newSMS,
  smsSendOk,
  smsSendFail
} = require('./messages');

//Register channel - function relation in a map.
const bindings: channelMapType = [
  ['sms', newSMS],
  ['sms_ok', smsSendOk],
  ['sms_fail', smsSendFail]   
];

module.exports = {
  bindings
};