const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rips')
        .setDescription('Get a list of ripped assets by other members.')
        .addStringOption(option => 
            option.setName('game')
                .setDescription('The game you want an asset from.')
                .addChoice('Sonic Adventure Series', 'sonic_adventure')
                .addChoice('Sonic Heroes', 'sonic_heroes')
                .addChoice('Shadow The Hedgehog', 'shadow_05')
                .addChoice('Sonic The Hedgehog (2006)', 'sonic_06')
                .addChoice('Sonic Unleashed', 'sonic_unleashed')
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

        const { count, rows } = await interaction.client.Rips.findAndCountAll({ where: { game: game, category: category } });

        if (count < 1) return await interaction.reply({ content: 'There are no available ripped assets for that query.', ephemeral: true });

        let rips = '';

        rows.forEach(function(row) {
            rips += `${row.id}. [${row.name}](${row.link})\nBy: ${row.author}`;
        });

        return await interaction.reply(rips);
    },
};
