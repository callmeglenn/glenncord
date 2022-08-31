import type { ClientOptions, Collection } from 'discord.js';
import Client from '../client/Client';
import { SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder, ChatInputCommandInteraction } from "discord.js";
import type { DisTubeEvents } from 'distube';
import { Document, Model } from 'mongoose';
export interface LoginCredentials {
    token: string;
    mongo?: string;
}
export interface DirectorySettings {
    commands?: string;
    events?: string;
}
export interface GlennOptions extends ClientOptions {
    credentials: LoginCredentials;
    directories?: DirectorySettings;
    music?: boolean;
}
export interface ClientCommandInteraction extends ChatInputCommandInteraction<"cached"> {
    client: Client;
}
export interface On {
    (client: Client, ...args: any[]): any;
}
export interface Run {
    (interaction: ClientCommandInteraction): any;
}
export interface BaseEvent {
    event: string | keyof DisTubeEvents;
    music?: boolean;
    on: On;
}
export interface BaseCommand {
    data: Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup"> | SlashCommandSubcommandsOnlyBuilder;
    cooldown?: number;
    run: Run;
}
export declare type MongoCache = Collection<string, Document>;
export declare type MongoModel = Model<any> | Model<unknown, unknown, unknown, {}, any>;
