const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rips')
        .setDescription('Get a list of ripped assets by other members.')
        .addStringOption(option => 
            option.setName('game')
                .setDescription('The game you want a ripped asset from.')
                .addChoice('Sonic Adventure Series', 'sonic_adventure')
                .addChoice('Sonic Heroes', 'sonic_heroes')
                .addChoice('Shadow The Hedgehog', 'shadow_05')
                .addChoice('Sonic The Hedgehog (2006)', 'sonic_06')
                .addChoice('Sonic Unleashed', 'sonic_unleashed')
                .addChoice('Sonic The Hedgehog 4 Series', 'sonic_4')
                .addChoice('Sonic Colors', 'sonic_colors')
                .addChoice('Sonic Generations', 'sonic_generations')
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
        const game = interaction.options.getString('game');
        const category = interaction.options.getString('category');

        const { count, rows } = await interaction.client.RippedAssets.findAndCountAll({ where: { game: game, category: category } });

        const noRippedAssetsEmbed = new MessageEmbed()
            .setColor(interaction.client.config.colors.redColor)
            .setAuthor('There are no ripped assets in the database for your query.', interaction.client.config.assets.avatar);

        if (count < 1) return await interaction.reply({ embeds: [noRippedAssetsEmbed], ephemeral: true });

        let rippedAssets = '';

        rows.forEach(function(row) {
            rippedAssets += `**${row.id}.** [${row.name}](${row.link})\n**By:** ${row.author}\n`;
        });

        const rippedAssetsEmbed = new MessageEmbed()
            .setColor(interaction.client.config.colors.redColor)
            .setAuthor('All available ripped assets for your query.', interaction.client.config.assets.avatar)
            .setDescription(rippedAssets);

        return await interaction.reply({ embeds: [rippedAssetsEmbed] });
    },
};
