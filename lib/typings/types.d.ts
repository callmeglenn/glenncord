import type { ClientOptions } from 'discord.js';
import Client from '../client/Client';
import { SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder, ChatInputCommandInteraction } from "discord.js";
import type { DisTubeEvents } from 'distube';
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
export interface On {
    (client: Client, ...args: any[]): any;
}
export interface Run {
    (interaction: ChatInputCommandInteraction): any;
}
export interface BaseEvent {
    event: string | keyof DisTubeEvents;
    music?: boolean;
    on: On;
}
export interface BaseCommand {
    data: SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder;
    cooldown?: number;
    run: Run;
}
