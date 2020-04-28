"use strict";
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var redis = require("redis");
//Start Express-js
var app = express();
var server = http.createServer(app);
//PORT.
var PORT = process.env.PORT || "8000";
//Create redis connection for read.
var client = redis.createClient({
    host: '127.0.0.1',
    port: 6379
});
//Create redis connection for publish.
var publisher = redis.createClient({
    host: '127.0.0.1',
    port: 6379
});
//Load routes
var _a = require('./routes/'), health = _a.health, test = _a.test, getKey = _a.getKey, sendSms = _a.sendSms;
var _b = require('./lib/'), allowCrossDomain = _b.allowCrossDomain, hello = _b.hello;
//Set middlewares.
app.use(allowCrossDomain);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//Set routes.
app.get('/health', health);
app.get('/test', test);
app.get('/key/:uuid', function (req, res) { return getKey(req, res, client); });
app.post('/sms', function (req, res) { return sendSms(req, res, publisher); });
app.listen(PORT, function () {
    hello(PORT);
    console.log("Server started");
});
