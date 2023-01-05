const { Events, ActivityType } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        client.RippedAssets.sync();
        client.user.setActivity('Sonic Frontiers', { type: ActivityType.Playing });
        console.log(`Ready! Logged in as ${client.user.tag} (${client.user.id})`);
    },
};
