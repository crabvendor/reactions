
const Discord = require('discord.js');
const { messageID, TOKEN } = require('./config.js');
const RoleAssignment = require('./roleAssignment.js');
const roleAssigner = new RoleAssignment.RoleAssigner();
const bot = new Discord.Client({partials: ['MESSAGE', 'CHANNEL', 'REACTION']});

bot.on('ready', () => {
    console.log("Bot initialized");
});

bot.on('messageReactionAdd', (reaction, user) => {
    if (reaction.message.id == messageID) roleAssigner.grantRole(reaction, user);
});    

bot.on('messageReactionRemove', (reaction, user) => {
    if (reaction.message.id == messageID) roleAssigner.removeRole(reaction, user);
});

bot.login(TOKEN);
