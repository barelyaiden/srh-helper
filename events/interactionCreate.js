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
                await interaction.reply({ content: `You cannot use bot commands outside of <#${interaction.client.config.channels.botCommandsChannelId}>!`, ephemeral: true });
                return;
            }
        }

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(`Error executing ${interaction.commandName}`);
            console.error(error);
        }
    },
};
