"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ClientEvent {
    constructor(params) {
        var _a;
        this.event = params.event;
        this.music = (_a = params.music) !== null && _a !== void 0 ? _a : false;
        this.on = params.on;
    }
}
exports.default = ClientEvent;
//# sourceMappingURL=ClientEvent.js.map