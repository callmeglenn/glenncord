import { BaseCommand, Run } from '../typings/types'
import { Collection, SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder } from 'discord.js'
class ClientCommand implements BaseCommand {
	public data: Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup"> | SlashCommandSubcommandsOnlyBuilder
	public cooldown?: number
	public cooldowns?: Collection<string, number>
	public run: Run
	constructor(params: BaseCommand) {
		this.data = params.data
		this.cooldown = params.cooldown ?? null
		this.cooldowns = this.cooldown ? new Collection() : null
		this.run = params.run
	}
}
export default ClientCommand