import {
    Client,
    Collection,
    Interaction,
    IntentsBitField,
    REST,
    Routes,
    CommandInteraction,
    AutocompleteInteraction,
    ContextMenuCommandInteraction
} from "discord.js";
import Cooldown from "./Handlers/Cooldown";
import Log from "./Handlers/Log";
import { readdirSync } from "fs";
import "dotenv/config";

// Define the client and its intents
const client = new Client({
    intents: [IntentsBitField.Flags.Guilds],
});

// Define the main Cooldowns and Log Instance
const mainCooldowns = new Cooldown();
const log = new Log("Deploy");

// Export the client and cooldowns
export { client, mainCooldowns };

// Load the events
const eventFiles = readdirSync("./src/Events").filter((file) => file.endsWith(".ts"));

for (const file of eventFiles) {
    const event = require(`./Events/${ file }`);
    if (event.default.once) {
        client.once(event.default.name, (...args) => event.default.execute(...args));
    } else {
        client.on(event.default.name, (...args) => event.default.execute(...args));
    }
}

// Load the commands
const commandFiles = readdirSync("./src/Commands").filter((file) => file.endsWith(".ts"));
const commands = new Collection();

for (const file of commandFiles) {
    const command = require(`./Commands/${ file }`);
    client.application?.commands.set(command.default.data.name, command.default);
    commands.set(command.default.data.name, command.default);
    client.on("interactionCreate", async (interaction: Interaction) => {
        if (interaction.isCommand() && interaction.commandName === command.default.data.name) {
            await command.default.execute(interaction as CommandInteraction);
        } else if (interaction.isAutocomplete() && interaction.commandName === command.default.data.name) {
            await command.default.autocomplete(interaction as AutocompleteInteraction);
        } else if (interaction.isMessageContextMenuCommand() && interaction.commandName === command.default.data.name) {
            await command.default.execute(interaction as ContextMenuCommandInteraction);
        }
    });
}

// Load the environment variables
const discordToken = process.env.DISCORD_TOKEN as string;
const clientId = process.env.CLIENT_ID as string;
const guildId = process.env.GUILD_ID as string;

// Register / Refresh the slash commands
(async () => {
    const rest = new REST({ version: "10" }).setToken(discordToken);
    try {
        log.info("Started refreshing application (/) commands.");
        const globalCommands = commands.filter((command: any) => command.global);
        const guildCommands = commands.filter((command: any) => !command.global);
        await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
            body: guildCommands.map((command: any) => command.data.toJSON()),
        });
        await rest.put(Routes.applicationCommands(clientId), {
            body: globalCommands.map((command: any) => command.data.toJSON()),
        });
        log.info("Successfully reloaded application (/) commands.");
    } catch (error: unknown) {
        log.error("Failed to reload application (/) commands.");
        log.error(`${ error }`);
    }

    // Login to Discord with your client's token
    await client.login(discordToken);
})();
