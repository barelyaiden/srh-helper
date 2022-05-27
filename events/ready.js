module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        await client.RippedAssets.sync();
        await client.user.setPresence({ activities: [{ name: 'Sonic and the Black Knight', type: 'PLAYING' }], status: 'dnd' });
        console.log(`Successfully logged in as ${client.user.tag} (${client.user.id})`);
    },
};
