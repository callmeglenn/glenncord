import { BaseCommand, ClientCommandType, Run } from '../typings/types'
import { Collection, SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder } from 'discord.js'
class ClientCommand implements BaseCommand {
	public data: SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder
	public cooldown?: number
	public cooldowns?: Collection<string, number>
	public type: ClientCommandType = ClientCommandType.DM_ALLOWED
	public run: Run
	constructor(params: BaseCommand) {
		this.data = params.data
		this.cooldown = params.cooldown ?? null
		this.cooldowns = this.cooldown ? new Collection() : null
		if (params.type) this.type = params.type
		this.run = params.run
	}
}
export default ClientCommand;