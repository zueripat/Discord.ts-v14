import { SlashCommandBuilder, CommandInteraction } from "discord.js";

/**
 * @name ping
 * @description Replies with Pong!
 * @param {CommandInteraction} interaction
 */

export default {
  global: true, // If the command is global or guild only (default: false if GUILD_ID is set in .env, true if not)
  data: new SlashCommandBuilder().setName("ping").setDescription("Replies with Pong!"),
  async execute(interaction: CommandInteraction) {
    return await interaction.reply({ content: "Pong!", ephemeral: true });
  },
};
