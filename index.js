const Discord = require('discord.js');

const bot = new Discord.Client();

// Insert Id of your guild:
const guild = bot.guilds.get("guildID");

// Insert your authentication token:
const TOKEN = "authToken";

// Insert name of emojis that trigger reactions mapped to name of correspondive roles:
const Roles = {
    "SabaPing": "Fish",
}

const cacheReactionMessage = async () => {
    // Insert id of message (and it's channel) that's listening to reactions:
    const channelId = "channelId";
    const messageId = "messageId";
    const reactionChannel = bot.channels.get(channelId);
    reactionChannel.fetchMessage(messageId);
    await console.log(`Fetched and cached message: ${messageId}`);
}

bot.on('ready', () => {
    console.log("Bot initialized");
    cacheReactionMessage();
});

bot.on('messageReactionAdd', async ({ emoji }, { username, id }) => {
    const role = guild.roles.find(role => role.name === Roles[emoji.name]);
    const member = guild.members.find(member => member.id === id);
    if (role && member) {
        member.addRole(role.id);
        await console.log(`Granted role ${role.name} to user ${username}`);
    }
});

bot.on('messageReactionRemove', async ({ emoji }, { username, id }) => {
    const role = guild.roles.find(role => role.name === Roles[emoji.name]);
    const member = guild.members.find(member => member.id === id);
    if (role && member) {
        member.removeRole(role.id);
        await console.log(`Removed role ${role.name} from user ${username}`);
    }
});

bot.login(TOKEN);
