"use strict";
var redis = require("redis");
var _a = require('./events'), onSubscribe = _a.onSubscribe, onMessage = _a.onMessage;
try {
    //We need to exclusive connection to use pub/sub.
    var subscriber = redis.createClient();
    var publisher_1 = redis.createClient();
    //This extra connection is to make updates.
    var client_1 = redis.createClient();
    //Define events..
    subscriber.on("subscribe", onSubscribe);
    subscriber.on("message", function (channel, message) { return onMessage(publisher_1, client_1, channel, message); });
    //Subscribe.
    subscriber.subscribe("sms");
    subscriber.subscribe("sms_ok");
    subscriber.subscribe("sms_fail");
}
catch (err) {
    console.log('Error received', err);
}
