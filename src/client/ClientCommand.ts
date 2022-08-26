import { BaseCommand, Run } from '../typings/types'
import { Collection, SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder } from 'discord.js'
class ClientCommand implements BaseCommand {
    public data: SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder
    public cooldown?: number
    public cooldowns?: Collection<string, number>
    public run: Run
    constructor(params: BaseCommand) {
        this.data = params.data
        this.cooldown = params.cooldown ?? null
        this.cooldowns = this.cooldown ? new Collection() : null
        this.run = params.run
    }
    public getCooldown(id: string): number {
        const timestamp = this.cooldowns.get(id)
        return timestamp > Date.now() ? timestamp - Date.now() : null
    }
    public setCooldown(id: string): void {
        this.cooldowns.set(id, Date.now() + this.cooldown)
    }
}
export default ClientCommand;