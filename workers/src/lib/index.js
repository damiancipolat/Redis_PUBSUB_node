"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
  Read the channel map and return the processor
  function by the channel name.
*/
var readMap = function (map, key) {
    //Find the function in the channel.
    var fn = map.find(function (elem) { return elem && elem.length > 0 && elem[0] === key; });
    return (fn && fn.length > 0) ? fn[1] : null;
};
//Receive a message and decode it.
var decodeMessage = function (message) {
    try {
        return JSON.parse(message);
    }
    catch (err) {
        return null;
    }
};
module.exports = {
    readMap: readMap,
    decodeMessage: decodeMessage
};
