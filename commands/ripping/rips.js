const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rips')
        .setDescription('Get a list of ripped assets by other members.')
        .addStringOption(option => 
            option.setName('game')
                .setDescription('The game you want a ripped asset from.')
                .setRequired(true)
                .addChoices(
                    { name: 'Sonic Adventure Series', value: 'sonic_adventure' },
                    { name: 'Sonic Heroes', value: 'sonic_heroes' },
                    { name: 'Shadow The Hedgehog', value: 'shadow_05' },
                    { name: 'Sonic The Hedgehog (2006)', value: 'sonic_06' },
                    { name: 'Sonic Unleashed', value: 'sonic_unleashed' },
                    { name: 'Sonic The Hedgehog 4 Series', value: 'sonic_4' },
                    { name: 'Sonic Colors Series', value: 'sonic_colors' },
                    { name: 'Sonic Generations', value: 'sonic_generations' },
                    { name: 'Sonic Boom', value: 'sonic_boom' },
                    { name: 'Sonic Mobile Games', value: 'sonic_mobile' },
                    { name: 'Sonic Lost World', value: 'sonic_lost_world' },
                    { name: 'Sonic Forces', value: 'sonic_forces' },
                    { name: 'Sonic Frontiers', value: 'sonic_frontiers' },
                    { name: 'Sonic Superstars', value: 'sonic_superstars' },
                    { name: 'SONIC X SHADOW GENERATIONS', value: 'sonic_shadow_generations' },
                    { name: 'Sonic and the Secret Rings', value: 'sonic_rings' },
                    { name: 'Sonic and the Black Knight', value: 'sonic_knight' },
                    { name: 'Sonic Rush Series', value: 'sonic_rush' },
                    { name: 'Sonic Riders Series', value: 'sonic_riders' },
                    { name: 'Team Sonic Racing', value: 'team_sonic_racing' },
                    { name: 'Mario & Sonic at the Olympic Games Series', value: 'olympics' },
                ))
        .addStringOption(option =>
            option.setName('category')
                .setDescription('The category the ripped asset belongs to.')
                .setRequired(true)
                .addChoices(
                    { name: 'Character', value: 'character' },
                    { name: 'Boss', value: 'boss' },
                    { name: 'Enemy', value: 'enemy' },
                    { name: 'Vehicle', value: 'vehicle' },
                    { name: 'Stage', value: 'stage' },
                    { name: 'Video', value: 'video' },
                    { name: 'Audio', value: 'audio' },
                    { name: 'HUD', value: 'hud' },
                    { name: 'Miscellaneous', value: 'misc' },
                )),
    async execute(interaction) {
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('left')
                    .setStyle(ButtonStyle.Primary)
                    .setEmoji(interaction.client.config.emojis.leftArrowEmojiId)
                    .setDisabled(true),
                new ButtonBuilder()
                    .setCustomId('right')
                    .setStyle(ButtonStyle.Primary)
                    .setEmoji(interaction.client.config.emojis.rightArrowEmojiId),
            );

        const game = await interaction.options.getString('game');
        const category = await interaction.options.getString('category');

        const { count, rows } = await interaction.client.RippedAssets.findAndCountAll({ where: { game: game, category: category } });

        const noRippedAssetsEmbed = new EmbedBuilder()
            .setColor(interaction.client.config.colors.redColor)
            .setAuthor({ name: 'There are no ripped assets in the database for your query.', iconURL: interaction.client.config.assets.avatar })
            .addFields(
                { name: 'Game:', value: game },
                { name: 'Category:', value: category }
            );

        if (count < 1) return await interaction.reply({ embeds: [noRippedAssetsEmbed], ephemeral: true });

        let currentPage = 0;
        const embeds = generateRippedAssetsEmbed(interaction, rows, game, category);

        if (embeds.length < 2) {
            await interaction.reply({ embeds: [embeds[currentPage]] });
        } else {
            embeds[currentPage].setFooter({ text: `Page: ${currentPage+1}/${embeds.length} • ${game} • ${category}` });

            await interaction.reply({ embeds: [embeds[currentPage]], components: [row] });

            setTimeout(async function() {
                await interaction.editReply({ components: [] });
            }, 15000);
        }

        const filter = i => i.user.id === interaction.user.id;

        const collector = await interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

        collector.on('collect', async i => {
            if (i.customId === 'left') {
                if (currentPage !== 0) {
                    --currentPage;
                    if (currentPage === 0) row.components[0].setDisabled(true);
                    row.components[1].setDisabled(false);
                    await i.update({ embeds: [embeds[currentPage]], components: [row] });
                }
            } else if (i.customId === 'right') {
                if (currentPage < embeds.length-1) {
                    currentPage++;
                    if (currentPage === embeds.length-1) row.components[1].setDisabled(true);
                    row.components[0].setDisabled(false);
                    embeds[currentPage].setFooter({ text: `Page: ${currentPage+1}/${embeds.length} • ${game} • ${category}` });
                    await i.update({ embeds: [embeds[currentPage]], components: [row] });
                }
            }
        });
    },
};

function generateRippedAssetsEmbed(interaction, rows, game, category) {
    const embeds = [];
    let a = 10;

    for (let i = 0; i < rows.length; i += 10) {
        const current = rows.slice(i, a);
        a += 10;

        const rippedAssets = current.map(rippedAsset => `**${rippedAsset.id}.** [${rippedAsset.name}](${rippedAsset.link})\n**By:** ${rippedAsset.author}`).join('\n');

        const rippedAssetsEmbed = new EmbedBuilder()
            .setColor(interaction.client.config.colors.redColor)
            .setAuthor({ name: 'All available ripped assets for your query.', iconURL: interaction.client.config.assets.avatar })
            .setFooter({ text: `${game} • ${category}` })
            .setDescription(rippedAssets);
        embeds.push(rippedAssetsEmbed);
    }

    return embeds;
}
