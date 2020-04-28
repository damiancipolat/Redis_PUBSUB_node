"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
//Get random integer.
var getRandomInt = function (values) {
    return Math.floor(Math.random() * (values.max - values.min)) + values.min;
};
//Publish order success.
var publishSms = function (client, message) { return client.publish("sms", message); };
//Update in redis the order by id.
var getOrder = function (client, uuid) {
    return new Promise(function (resolve, reject) {
        client.get(uuid, function (err, res) {
            if (err)
                reject(err);
            else
                resolve(res);
        });
    });
};
module.exports = {
    publishSms: publishSms,
    getRandomInt: getRandomInt,
    getOrder: getOrder
};
