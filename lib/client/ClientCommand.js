"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../typings/types");
const discord_js_1 = require("discord.js");
class ClientCommand {
    constructor(params) {
        var _a;
        this.type = types_1.ClientCommandType.DM_ALLOWED;
        this.data = params.data;
        this.cooldown = (_a = params.cooldown) !== null && _a !== void 0 ? _a : null;
        this.cooldowns = this.cooldown ? new discord_js_1.Collection() : null;
        if (params.type)
            this.type = params.type;
        this.run = params.run;
    }
}
exports.default = ClientCommand;
//# sourceMappingURL=ClientCommand.js.map