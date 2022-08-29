import { BaseCommand, Run } from '../typings/types';
import { Collection, SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder } from 'discord.js';
declare class ClientCommand implements BaseCommand {
    data: SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder;
    cooldown?: number;
    cooldowns?: Collection<string, number>;
    run: Run;
    constructor(params: BaseCommand);
}
export default ClientCommand;
