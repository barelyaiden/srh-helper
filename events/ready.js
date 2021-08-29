module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`Successfully logged in as ${client.user.tag} (${client.user.id})`);
        client.user.setPresence({ activities: [{ name: 'Sonic and the Black Knight', type: 'PLAYING' }], status: 'dnd' });
        client.RippedAssets.sync();
    },
};
