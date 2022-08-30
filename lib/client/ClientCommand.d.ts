import { BaseCommand, ClientCommandType, Run } from '../typings/types';
import { Collection, SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder } from 'discord.js';
declare class ClientCommand implements BaseCommand {
    data: Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup"> | SlashCommandSubcommandsOnlyBuilder;
    cooldown?: number;
    cooldowns?: Collection<string, number>;
    type: ClientCommandType;
    run: Run;
    constructor(params: BaseCommand);
}
export default ClientCommand;
