import * as Discord from 'discord.js';
import DisTube from 'distube';
import { LoginCredentials, DirectorySettings, GlennOptions } from '../typings/types';
import ClientCommand from './ClientCommand';
declare class Client extends Discord.Client {
    extensions: GlennOptions;
    commands: Discord.Collection<string, ClientCommand>;
    credentials: LoginCredentials;
    directories: DirectorySettings;
    distube: DisTube;
    typescript?: boolean;
    constructor(extensions: GlennOptions);
    start(): Promise<void>;
    private connectToMongo;
    private registerCommandFiles;
    private registerEventFiles;
}
export default Client;
