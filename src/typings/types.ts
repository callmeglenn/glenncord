import type { CacheType, ClientOptions } from 'discord.js'
import Client from '../client/Client'
import { SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder, ChatInputCommandInteraction } from "discord.js"
import type { DisTubeEvents } from 'distube'

export interface LoginCredentials {
	token: string
	mongo?: string
}
export interface DirectorySettings {
	commands?: string
	events?: string
}
export interface GlennOptions extends ClientOptions {
	credentials: LoginCredentials
	directories?: DirectorySettings
	music?: boolean
}

export interface On {
	(client: Client, ...args: any[])
}
export interface Run {
	(interaction: ChatInputCommandInteraction<CacheType>)
}
export interface BaseEvent {
	event: string | keyof DisTubeEvents
	music?: boolean
	on: On
}
export interface BaseCommand {
	data: SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder
	cooldown?: number
	type?: ClientCommandType
	run: Run
}
export enum ClientCommandType {
	GUILD_ONLY = 0,
	DM_ALLOWED = 1,
	DM_ONLY = 2
}