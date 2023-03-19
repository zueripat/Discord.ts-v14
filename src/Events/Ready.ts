import { Client } from "discord.js";

/**
 * @name ready
 * @description A Event that is executed when the bot is ready
 * @param {Client} client
 */

export default {
  name: "ready",
  once: true, // This event will only be executed once (when the bot is ready)
  execute(client: Client) {
    console.log(`Logged in as ${client.user?.tag}!`);
  },
};
