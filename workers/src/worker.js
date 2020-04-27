"use strict";
var redis = require("redis");
var _a = require('./events'), onSubscribe = _a.onSubscribe, onMessage = _a.onMessage;
try {
    var subscriber = redis.createClient();
    //Define events..
    subscriber.on("subscribe", onSubscribe);
    subscriber.on("message", onMessage);
    //Subscribe.
    subscriber.subscribe("sms");
    subscriber.subscribe("sms_ok");
    subscriber.subscribe("sms_fail");
}
catch (err) {
    console.log('Error received', err);
}
