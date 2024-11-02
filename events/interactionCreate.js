const { Events } = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }

        if (interaction.channel.id !== interaction.client.config.channels.botCommandsChannelId) {
            if (!interaction.member.roles.cache.some(role => role.name === interaction.client.config.roles.moderationRoleName)) {
                return await interaction.reply({ content: `You cannot use bot commands outside of <#${interaction.client.config.channels.botCommandsChannelId}>!`, ephemeral: true });
            }
        }

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);

            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
            } else {
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        }
    },
};
