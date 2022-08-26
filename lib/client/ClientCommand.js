"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
class ClientCommand {
    constructor(params) {
        var _a;
        this.data = params.data;
        this.cooldown = (_a = params.cooldown) !== null && _a !== void 0 ? _a : null;
        this.cooldowns = this.cooldown ? new discord_js_1.Collection() : null;
        this.run = params.run;
    }
    getCooldown(id) {
        const timestamp = this.cooldowns.get(id);
        return timestamp > Date.now() ? timestamp - Date.now() : null;
    }
    setCooldown(id) {
        this.cooldowns.set(id, Date.now() + this.cooldown);
    }
}
exports.default = ClientCommand;
//# sourceMappingURL=ClientCommand.js.map