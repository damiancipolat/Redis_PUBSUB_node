"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = require('../service/'), getRandomInt = _a.getRandomInt, getOrder = _a.getOrder, publishSms = _a.publishSms;
//Mock endpoint.
var health = function (req, res) {
    res.json({ mode: "health" });
};
var test = function (req, res) {
    res.json({
        mode: "test",
        value: getRandomInt(0, 10)
    });
};
//Read from redis data about a key.
var getKey = function (req, res, client) { return __awaiter(void 0, void 0, void 0, function () {
    var data, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, getOrder(client, req.params.uuid)];
            case 1:
                data = _a.sent();
                res.status(200).json({
                    uuid: req.params.uuid,
                    value: data
                });
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                console.log('Error reading from redis', err_1);
                res.status(500).json({
                    uuid: req.params.uuid,
                    error: true,
                    detail: err_1
                });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
//Create the message.
var buildSms = function (number, text) {
    return {
        uuid: 'sms-' + new Date().getTime(),
        number: number,
        text: text
    };
};
//Receive the sms request and publish in redis.
var sendSms = function (req, res, publisher) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, number, text, message, result;
    return __generator(this, function (_b) {
        try {
            //Validate request.
            if (!(req.body && req.body.number && req.body.text)) {
                res.status(400).json({
                    detail: "Bad sms request."
                });
            }
            _a = req.body, number = _a.number, text = _a.text;
            message = buildSms(number, text);
            result = publishSms(publisher, JSON.stringify(message));
            //Return if is success the publication.
            if (result)
                res.status(200).json(message);
            else
                res.status(500).json({ uuid: 1111, error: true });
        }
        catch (err) {
            console.log('Error publishing from redis', err);
            res.status(500).json({
                error: 'Error sending sms'
            });
        }
        return [2 /*return*/];
    });
}); };
module.exports = {
    sendSms: sendSms,
    health: health,
    test: test,
    getKey: getKey
};
