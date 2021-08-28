const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('share')
        .setDescription('Share a ripped asset from a Sonic game.')
        .addStringOption(option => 
            option.setName('game')
                .setDescription('The game the ripped asset belongs to.')
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
                .setRequired(true))
        .addStringOption(option =>
            option.setName('name')
                .setDescription('The name of the ripped asset.')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('link')
                .setDescription('The download link of the ripped asset.')
                .setRequired(true)),
    async execute(interaction) {
        const game = interaction.options.getString('game');
        const category = interaction.options.getString('category');
        const name = interaction.options.getString('name');
        const link = interaction.options.getString('link');

        if (!link.startsWith('https')) return await interaction.reply({ content: 'Please input a valid download link.', ephemeral: true });

        await interaction.client.Rips.create({
            game: game,
            category: category,
            author: interaction.user.tag,
            name: name,
            link: link
        });

        return await interaction.reply('Successfully submitted the ripped asset!');
    },
};
