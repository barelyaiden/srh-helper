const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const package = require('../package.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('about')
        .setDescription('Get information about the bot.'),
    async execute(interaction) {
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('information')
                    .setLabel('Information')
                    .setStyle('PRIMARY'),
                new MessageButton()
                    .setCustomId('github')
                    .setLabel('GitHub')
                    .setStyle('SECONDARY'),
                new MessageButton()
                    .setCustomId('special-thanks')
                    .setLabel('Special Thanks')
                    .setStyle('SECONDARY'),
            );

        const informationEmbed = new MessageEmbed()
            .setColor(interaction.client.config.colors.redColor)
            .setAuthor('About SRH Helper', interaction.client.config.assets.avatar)
            .setDescription(package.description)
            .addFields(
                { name: 'Author:', value: `${package.author}#6219` },
                { name: 'Version:', value: package.version },
                { name: 'Library:', value: `Discord.js v${package.dependencies['discord.js'].substring(1)}` }
            )
            .setImage(interaction.client.config.assets.banner);

        const gitHubEmbed = new MessageEmbed()
            .setColor(interaction.client.config.colors.whiteColor)
            .setAuthor('GitHub Repository', interaction.client.config.assets.gitHubLogo)
            .setDescription('If you would like to contribute to the project, report bugs or share suggestions, you can do so on the:\n\n**[Official GitHub Repository](https://github.com/barelyaiden/srh-helper)**')
            .setImage(interaction.client.config.assets.whiteBanner);

        const credits = [
            '**Kyria!**',
            'For generously hosting the bot on their own VPS.',
            '**Devin!**',
            'For contributing to the project with a License file.',
            '**The Sonic Ripping Community!**',
            'For sharing so many ripped assets for others to use for their own projects.'
        ].join('\n');

        const specialThanksEmbed = new MessageEmbed()
            .setColor(interaction.client.config.colors.greenColor)
            .setAuthor('Special Thanks', interaction.client.config.assets.greenAvatar)
            .setDescription(credits)
            .setImage(interaction.client.config.assets.greenBanner);

        await interaction.reply({ embeds: [informationEmbed], components: [row] });

        const filter = i => i.user.id === interaction.user.id;

        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

        collector.on('collect', async i => {
            if (i.customId === 'information') {
                await i.update({ embeds: [informationEmbed] });
            } else if (i.customId === 'github') {
                await i.update({ embeds: [gitHubEmbed] });
            } else if (i.customId === 'special-thanks') {
                await i.update({ embeds: [specialThanksEmbed] });
            }
        });

        setTimeout(async function() {
            await interaction.editReply({ components: [] });
        }, 15000);
    },
};
