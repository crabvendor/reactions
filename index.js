
// import { roleAssigner } from './roleAssignment.js';
const Discord = require('discord.js');
const RoleAssignment = require('./roleAssignment.js');
const roleAssigner = new RoleAssignment.RoleAssigner();
const bot = new Discord.Client();

// Insert your authentication token:
const TOKEN = "authToken";


const cacheReactionMessage = async () => {
    // Insert id of message (and it's channel) that's listening to reactions:
    const channelId = "channelId";
    const messageId = "messageId";
    const reactionChannel = bot.channels.get(channelId);
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
