"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Client_1 = __importDefault(require("./client/Client"));
const ClientEvent_1 = __importDefault(require("./client/ClientEvent"));
const ClientCommand_1 = __importDefault(require("./client/ClientCommand"));
const types_1 = require("./typings/types");
/**
 * Examples can be found in the [npm page](https://npmjs.com/package/glenncord).
*/
const Glenncord = {
    Client: Client_1.default,
    ClientEvent: ClientEvent_1.default,
    ClientCommand: ClientCommand_1.default,
    ClientCommandType: types_1.ClientCommandType
};
module.exports = Glenncord;
//# sourceMappingURL=index.js.map