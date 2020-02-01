
const Discord = require('discord.js');
const { channelID, messageID, TOKEN } = require('./config.js');
const RoleAssignment = require('./roleAssignment.js');
const roleAssigner = new RoleAssignment.RoleAssigner();
const bot = new Discord.Client();

const cacheReactionMessage = async () => {
    const reactionChannel = bot.channels.get(channelID);
    try {
        message = await reactionChannel.fetchMessage(messageID);
        message.reactions.forEach((reaction) => {
            reaction.fetchUsers();
        })
        await console.log(`Fetched and cached message: ${messageID}`);
    } catch (error) {
        console.log(error);
    }
}

bot.on('ready', () => {
    console.log("Bot initialized");
    cacheReactionMessage();
});

bot.on('messageReactionAdd', (reaction, user) => {
    if (reaction.message.id == messageID) roleAssigner.grantRole(reaction, user);
});    

bot.on('messageReactionRemove', (reaction, user) => {
    if (reaction.message.id == messageID) roleAssigner.removeRole(reaction, user);
});

bot.login(TOKEN);
