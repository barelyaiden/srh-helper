const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rips')
        .setDescription('Get a list of ripped assets by other members.')
        .addStringOption(option => 
            option.setName('game')
                .setDescription('The game you want a ripped asset from.')
                .addChoice('Sonic R', 'sonic_r')
                .addChoice('Sonic Adventure Series', 'sonic_adventure')
                .addChoice('Sonic Heroes', 'sonic_heroes')
                .addChoice('Shadow The Hedgehog', 'shadow_05')
                .addChoice('Sonic The Hedgehog (2006)', 'sonic_06')
                .addChoice('Sonic Unleashed', 'sonic_unleashed')
                .addChoice('Sonic The Hedgehog 4 Series', 'sonic_4')
                .addChoice('Sonic Colors', 'sonic_colors')
                .addChoice('Sonic Generations', 'sonic_generations')
                .addChoice('Sonic Boom', 'sonic_boom')
                .addChoice('Sonic Mobile Games', 'sonic_mobile')
                .addChoice('Sonic Lost World', 'sonic_lost_world')
                .addChoice('Sonic Forces', 'sonic_forces')
                .addChoice('Sonic and the Secret Rings', 'sonic_rings')
                .addChoice('Sonic and the Black Knight', 'sonic_knight')
                .addChoice('Sonic Rush Series', 'sonic_rush')
                .addChoice('Sonic Riders Series', 'sonic_riders')
                .addChoice('Team Sonic Racing', 'team_sonic_racing')
                .addChoice('Mario & Sonic at the Olympic Games Series', 'olympics')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('category')
                .setDescription('The category the ripped asset belongs to.')
                .addChoice('Character', 'character')
                .addChoice('Boss', 'boss')
                .addChoice('Enemy', 'enemy')
                .addChoice('Vehicle', 'vehicle')
                .addChoice('Stage', 'stage')
                .addChoice('Video', 'video')
                .addChoice('Audio', 'audio')
                .addChoice('HUD', 'hud')
                .addChoice('Miscellaneous', 'misc')
                .setRequired(true)),
    async execute(interaction) {
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('left')
                    .setLabel('◀')
                    .setStyle('PRIMARY'),
                new MessageButton()
                    .setCustomId('right')
                    .setLabel('▶')
                    .setStyle('PRIMARY'),
            );

        const game = interaction.options.getString('game');
        const category = interaction.options.getString('category');

        const { count, rows } = await interaction.client.RippedAssets.findAndCountAll({ where: { game: game, category: category } });

        const noRippedAssetsEmbed = new MessageEmbed()
            .setColor(interaction.client.config.colors.redColor)
            .setAuthor('There are no ripped assets in the database for your query.', interaction.client.config.assets.avatar);

        if (count < 1) return await interaction.reply({ embeds: [noRippedAssetsEmbed], ephemeral: true });

        let currentPage = 0;
        const embeds = generateRippedAssetsEmbed(interaction, rows);

        if (embeds.length < 2) {
            await interaction.reply({ embeds: [embeds[currentPage]] });
        } else {
            await interaction.reply({content: `**Page:** ${currentPage+1}/${embeds.length}`, embeds: [embeds[currentPage]], components: [row] });
        }

        const filter = i => i.user.id === interaction.user.id;

        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 30000 });

        collector.on('collect', async i => {
            if (i.customId === 'left') {
                if (currentPage !== 0) {
                    --currentPage;
                    await i.update({content: `**Page:** ${currentPage+1}/${embeds.length}`, embeds: [embeds[currentPage]] });
                }
            } else if (i.customId === 'right') {
                if (currentPage < embeds.length-1) {
                    currentPage++;
                    await i.update({content: `**Page:** ${currentPage+1}/${embeds.length}`, embeds: [embeds[currentPage]] });
                }
            }
        });
    },
};

function generateRippedAssetsEmbed(interaction, rows) {
    const embeds = [];
    let a = 10;

    for (let i = 0; i < rows.length; i += 10) {
        const current = rows.slice(i, a);
        a += 10;

        const rippedAssets = current.map(rippedAsset => `**${rippedAsset.id}.** [${rippedAsset.name}](${rippedAsset.link})\n**By:** ${rippedAsset.author}`).join('\n');

        const rippedAssetsEmbed = new MessageEmbed()
            .setColor(interaction.client.config.colors.redColor)
            .setAuthor('All available ripped assets for your query.', interaction.client.config.assets.avatar)
            .setDescription(rippedAssets);
        embeds.push(rippedAssetsEmbed);
    }

    return embeds;
}
