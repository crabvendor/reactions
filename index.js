
const Discord = require('discord.js');
const { channelID, messageID, TOKEN } = require('./config.js');
const RoleAssignment = require('./roleAssignment.js');
const roleAssigner = new RoleAssignment.RoleAssigner();
const bot = new Discord.Client();

const cacheReactionMessage = async () => {
    const reactionChannel = bot.channels.get(channelID);
    try {
        await reactionChannel.fetchMessage(messageId);     
        await console.log(`Fetched and cached message: ${messageId}`);
    } catch (error) {
        console.log(error);
    }
}

bot.on('ready', () => {
    console.log("Bot initialized");
    cacheReactionMessage();
});

bot.on('messageReactionAdd', roleAssigner.grantRole);    
bot.on('messageReactionRemove', roleAssigner.removeRole);
bot.login(TOKEN);
