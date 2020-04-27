"use strict";
var redis = require("redis");
var _a = require('./events'), onSubscribe = _a.onSubscribe, onMessage = _a.onMessage;
//Define connections.
var subscriber;
var publisher;
var client;
try {
    //We need to exclusive connection to use pub/sub.
    subscriber = redis.createClient({
        host: 'redis-server',
        port: 6379
    });
    publisher = redis.createClient({
        host: 'redis-server',
        port: 6379
    });
    //This extra connection is to make updates.
    client = redis.createClient({
        host: 'redis-server',
        port: 6379
    });
    //Define events..
    subscriber.on("subscribe", onSubscribe);
    subscriber.on("message", function (channel, message) { return onMessage(publisher, client, channel, message); });
    //Subscribe.
    subscriber.subscribe("sms");
    subscriber.subscribe("sms_ok");
    subscriber.subscribe("sms_fail");
}
catch (err) {
    console.log('Error received', err);
    //On a critical error finish connections.
    subscriber.unsubscribe();
    subscriber.quit();
    publisher.quit();
    client.quit();
}
