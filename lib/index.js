"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Client_1 = __importDefault(require("./classes/Client"));
const ClientEvent_1 = __importDefault(require("./classes/ClientEvent"));
const ClientCommand_1 = __importDefault(require("./classes/ClientCommand"));
const MongoDefault_1 = __importDefault(require("./classes/MongoDefault"));
/**
 * Examples can be found in the [npm page](https://npmjs.com/package/glenncord).
*/
const Glenncord = {
    Client: Client_1.default,
    ClientEvent: ClientEvent_1.default,
    ClientCommand: ClientCommand_1.default,
    MongoDefault: MongoDefault_1.default
};
module.exports = Glenncord;
//# sourceMappingURL=index.js.map