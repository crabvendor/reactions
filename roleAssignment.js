const Roles = require('./roles.js');

exports.RoleAssigner =
    class RoleAssigner {

        async grantRole({ emoji, message }, { username, id }) {
            try {
                const guild = message.guild;
                const role = await guild.roles.fetch(Roles[emoji.name]);
                const member = await guild.members.fetch(id);
                if (role && member) {
                    await member.roles.add(role.id);
                    console.log(`Granted role ${role.name} to user ${username}`);
                }
            } catch (error) {
                console.log(error);
            }
        }

        async removeRole({ emoji, message }, { username, id }) {
            try {
                const guild = message.guild;
                const role = await guild.roles.fetch(Roles[emoji.name]);
                const member = await guild.members.fetch(id);
                if (role && member) {
                    await member.roles.remove(role.id);
                    console.log(`Removed role ${role.name} from user ${username}`);
                }
            } catch (error) {
                console.log(error);
            }
        }
    }