"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Update in redis the order by id.
var updateOrder = function (client, uuid, status) {
    return new Promise(function (resolve, reject) {
        client.set(uuid, status, function (err, res) {
            if (err)
                reject(err);
            else
                resolve(res);
        });
    });
};
//Publish order success.
var publishSuccess = function (client, uuid) { return client.publish("sms_ok", "success"); };
//Publish order fail.
var publishFail = function (client, uuid) { return client.publish("sms_fail", "fail"); };
module.exports = {
    publishFail: publishFail,
    publishSuccess: publishSuccess,
    updateOrder: updateOrder
};
