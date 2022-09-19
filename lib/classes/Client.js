"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const Discord = __importStar(require("discord.js"));
const mongoose_1 = __importDefault(require("mongoose"));
const distube_1 = __importDefault(require("distube"));
const fs_1 = require("fs");
const ClientEvent_1 = __importDefault(require("./ClientEvent"));
const ClientCommand_1 = __importDefault(require("./ClientCommand"));
const spotify_1 = require("@distube/spotify");
class Client extends Discord.Client {
    constructor(extensions) {
        var _a;
        super(extensions);
        this.extensions = extensions;
        this.commands = new Discord.Collection();
        this.credentials = extensions.credentials;
        this.directories = extensions.directories;
        if (extensions.music) {
            const spotify = new spotify_1.SpotifyPlugin({ api: (_a = extensions.credentials.spotify) !== null && _a !== void 0 ? _a : null });
            this.distube = new distube_1.default(this, {
                plugins: [spotify],
                leaveOnStop: false,
                leaveOnFinish: true,
                emitNewSongOnly: true,
                emitAddListWhenCreatingQueue: false,
                emitAddSongWhenCreatingQueue: false
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
            mongoose_1.default.connect(this.credentials.mongo);
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
                    const data = yield Promise.resolve().then(() => __importStar(require(`${path.join(dir, file)}`)));
                    const module = data.default ? data.default : data;
                    if (module instanceof ClientCommand_1.default)
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
                    const data = yield Promise.resolve().then(() => __importStar(require(`${path.join(dir, file)}`)));
                    const module = data.default ? data.default : data;
                    if (module instanceof ClientEvent_1.default) {
                        if (!module.music)
                            this.on(module.event, module.on.bind(null, this));
                        else
                            this.distube.on(module.event, module.on.bind(null, this));
                    }
                }
            }
        });
    }
}
exports.default = Client;
//# sourceMappingURL=Client.js.map