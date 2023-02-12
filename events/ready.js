const { Events, ActivityType } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client) {
        await client.RippedAssets.sync();
        await client.user.setActivity('Sonic Frontiers', { type: ActivityType.Playing });
        console.log(`Ready! Logged in as ${client.user.tag} (${client.user.id})`);
    },
};
