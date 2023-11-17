const fs = require('node:fs');
const { SlashCommandBuilder, AttachmentBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('export')
        .setDescription('Export a .txt file of all the download links in the database.')
        .addStringOption(option => 
            option.setName('cdn-filter')
                .setDescription('Whether to filter Discord CDN links.')
                .setRequired(false)
                .addChoices(
                    { name: 'Enabled', value: 'enabled' },
                )),
    async execute(interaction) {
        await interaction.deferReply();

        const cdnFilter = await interaction.options.getString('cdn-filter');

        let links = [];
        const { count, rows } = await interaction.client.RippedAssets.findAndCountAll();

        if (count > 0) {
            rows.forEach(row => {
                if (row.link !== null) {
                    if (cdnFilter === 'enabled') {
                        if (row.link.startsWith('https://cdn.discordapp.com/')) links.push(`${row.name} / ${row.game} / ${row.category} / ${row.author}\n${row.link}`);
                    } else {
                        links.push(`${row.name} / ${row.game} / ${row.category} / ${row.author}\n${row.link}`);
                    }
                }
            });
        }

        let textFile = fs.createWriteStream('asset_links.txt');
        
        links.forEach(link => {
            textFile.write(`${link}\n`);
        });

        textFile.end();

        textFile.on('finish', async () => {
            const file = new AttachmentBuilder('asset_links.txt');
            return await interaction.editReply({ content: 'Here\'s your text file!', files: [file] });
        });
    },
};
