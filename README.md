# Discord.ts-v14
A template for a Discord Bot using the discord.js@v14 library in Typescript.

## Setup

1. Create a new Repository using this one as a Template.
2. Open the Repository in either a codespace or on a local environment. 
3. Create a `.env` cile to contain the following variables:
    1. `DISCORD_TOKEN` - Your Discord Bot Token
   2. `CLIENT_ID` - Your Discord Bot Client ID (User ID of the Bot)
   3. Optional: `GUILD_ID` - The ID of the Guild you want to use for testing
4. Run `npm install` to install the dependencies.
5. Run `npm run dev` to start the bot in development mode.

### Slash Commands
When creating a new Slash Command, you can choose to make it global or guild specific. To make all Commands Guild specific you can set the `GUILD_ID` in the `.env` file. If you then want to make a specific Command global, you can set the `global` property to `true` in the `Command` export. 

### Events
When creating a new event handler, you can choose to specify, that it only triggers once. To do so, you can set the `once` property to `true` in the `Event` export.

    
