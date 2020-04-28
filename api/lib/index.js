"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Mocked endpoint,
var hello = function (port) {
    console.log("Hello sms publisher server running in port:", port);
};
//Add CORS to middleware.
var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    // Intercepts OPTIONS method
    if ('OPTIONS' === req.method)
        res.sendStatus(200);
    else
        next();
};
module.exports = {
    hello: hello,
    allowCrossDomain: allowCrossDomain
};
