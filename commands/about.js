const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const package = require('../package.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('about')
        .setDescription('Get information about the bot.'),
    async execute(interaction) {
        const aboutEmbed = new MessageEmbed()
            .setColor(interaction.client.config.colors.redColor)
            .setAuthor('About SRH Helper', interaction.client.config.assets.avatar)
            .setDescription(package.description)
            .addFields(
                { name: 'Author:', value: `${package.author}#6219` },
                { name: 'Version:', value: package.version },
                { name: 'Library:', value: `Discord.js ${package.dependencies['discord.js'].substring(1)}` }
            )
            .setImage(interaction.client.config.assets.banner);

        await interaction.reply({ embeds: [aboutEmbed] });
    },
};
