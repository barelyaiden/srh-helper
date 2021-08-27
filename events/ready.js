module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`Successfully logged in as ${client.user.tag} (${client.user.id})`);
        client.user.setPresence({
            activities: [{
                name: client.config.bot.user.presence.name,
                type: client.config.bot.user.presence.type
            }],
            status: client.config.bot.user.presence.status
        });
    },
};
