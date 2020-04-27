"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _a = require('./messages'), newSMS = _a.newSMS, smsSendOk = _a.smsSendOk, smsSendFail = _a.smsSendFail;
//Register channel - function relation in a map.
var bindings = [
    ['sms', newSMS],
    ['sms_ok', smsSendOk],
    ['sms_fail', smsSendFail]
];
module.exports = {
    bindings: bindings
};
