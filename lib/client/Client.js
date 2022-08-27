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
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const Discord = require("discord.js");
const mongoose = require("mongoose");
const distube_1 = require("distube");
const fs_1 = require("fs");
class Client extends Discord.Client {
    constructor(extensions) {
        super(extensions);
        this.extensions = extensions;
        this.commands = new Discord.Collection();
        this.credentials = extensions.credentials;
        this.directories = extensions.directories;
        if (extensions.music) {
            this.distube = new distube_1.default(this, {
                leaveOnStop: false,
                leaveOnFinish: true,
                emitNewSongOnly: true
            });
        }
    }
    start() {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            if ((_a = this.directories) === null || _a === void 0 ? void 0 : _a.commands)
                yield this.registerCommandFiles(`${path.dirname(require.main.filename)}/${this.directories.commands}`);
            if ((_b = this.directories) === null || _b === void 0 ? void 0 : _b.events)
                yield this.registerEventFiles(`${path.dirname(require.main.filename)}/${this.directories.events}`);
            if (!((_c = this.credentials) === null || _c === void 0 ? void 0 : _c.token))
                throw Error("credentials/token parameter missing.");
            if (this.credentials.mongo)
                yield this.connectToMongo();
            this.login(this.credentials.token);
        });
    }
    connectToMongo() {
        return __awaiter(this, void 0, void 0, function* () {
            mongoose.connect(this.credentials.mongo);
            console.log("Successfully connected to Mongo.");
        });
    }
    registerCommandFiles(dir) {
        return __awaiter(this, void 0, void 0, function* () {
            const folder = yield fs_1.promises.readdir(path.join(dir));
            for (const file of folder) {
                const stat = yield fs_1.promises.lstat(path.join(dir, file));
                if (stat.isDirectory())
                    this.registerCommandFiles(path.join(dir, file));
                else if (file.endsWith('.ts') || file.endsWith('.js')) {
                    const data = yield Promise.resolve().then(() => require(`${path.join(dir, file)}`));
                    const module = (data.default ? data.default : data);
                    this.commands.set(module.data.name, module);
                }
            }
        });
    }
    registerEventFiles(dir) {
        return __awaiter(this, void 0, void 0, function* () {
            const folder = yield fs_1.promises.readdir(path.join(dir));
            for (const file of folder) {
                const stat = yield fs_1.promises.lstat(path.join(dir, file));
                if (stat.isDirectory())
                    this.registerEventFiles(path.join(dir, file));
                else if (file.endsWith('.ts') || file.endsWith('.js')) {
                    const data = yield Promise.resolve().then(() => require(`${path.join(dir, file)}`));
                    const module = (data.default ? data.default : data);
                    if (!module.music)
                        this.on(module.event, module.on.bind(null, this));
                    else
                        this.distube.on(module.event, module.on.bind(null, this));
                }
            }
        });
    }
}
exports.default = Client;
//# sourceMappingURL=Client.js.map