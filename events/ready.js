module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        await client.RippedAssets.sync();
        await client.user.setPresence({ activities: [{ name: 'Sonic and the Black Knight', type: 'PLAYING' }], status: 'dnd' });
        console.log(`Successfully logged in as ${client.user.tag} (${client.user.id})`);

        /*
        await client.guilds.cache.get(client.config.guild.guildId).commands.fetch().then(c => {
            console.log(c);
        });
        */

        if (!client.application?.owner) await client.application?.fetch();

        const fullPermissions = [
            {
                id: client.config.commands.shareCommandId,
                permissions: [
                    {
                        id: client.config.roles.rippersRoleId,
                        type: 'ROLE',
                        permission: true
                    },
                    {
                        id: client.config.roles.moderationRoleId,
                        type: 'ROLE',
                        permission: true
                    },
                ],
            },
            {
                id: client.config.commands.deleteCommandId,
                permissions: [
                    {
                        id: client.config.roles.rippersRoleId,
                        type: 'ROLE',
                        permission: true  
                    },
                    {
                        id: client.config.roles.moderationRoleId,
                        type: 'ROLE',
                        permission: true
                    },
                ],
            },
        ];

        await client.guilds.cache.get(client.config.guild.guildId)?.commands.permissions.set({ fullPermissions });
    },
};
