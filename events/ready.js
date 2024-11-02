const { Events, ActivityType } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client) {
        await client.RippedAssets.sync();
        await client.user.setActivity('SONIC X SHADOW GENERATIONS', { type: ActivityType.Playing });
        console.log(`Successfully logged in as ${client.user.tag} (${client.user.id})`);
    },
};
