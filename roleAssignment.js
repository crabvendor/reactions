const Roles = require('./roles.js');

exports.RoleAssigner = 
class RoleAssigner {

    async grantRole({ emoji, message }, { username, id }) {
        const guild = message.guild;
        const role = guild.roles.find(role => role.name === Roles[emoji.name]);
        const member = guild.members.find(member => member.id === id);
        if (role && member) {
            try {
                await member.addRole(role.id);                            
                await console.log(`Granted role ${role.name} to user ${username}`);        
            } catch (error) {
                console.log(error);
            }
        }
    }

    async removeRole({ emoji, message }, { username, id }) {
        const guild = message.guild;    
        const role = guild.roles.find(role => role.name === Roles[emoji.name]);
        const member = guild.members.find(member => member.id === id);
        if (role && member) {
            try {
                await member.removeRole(role.id);                
                await console.log(`Removed role ${role.name} from user ${username}`);            
            } catch (error) {
                console.log(error); 
            }
        }
    }
}