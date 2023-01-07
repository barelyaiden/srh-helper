const fs = require('node:fs');
const { SlashCommandBuilder, AttachmentBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('export')
        .setDescription('Export a .txt file of all the download links in the database.'),
    async execute(interaction) {
        await interaction.deferReply();

        let links = [];
        const { count, rows } = await interaction.client.RippedAssets.findAndCountAll();

        if (count > 0) {
            rows.forEach(async row => {
                if (row.link !== null) links.push(row.link);
            });
        }

        let textFile = fs.createWriteStream('asset_links.txt');
        
        links.forEach(link => {
            textFile.write(`${link}\n`);
        });

        textFile.end();

        textFile.on('finish', async () => {
            const file = new AttachmentBuilder('asset_links.txt');
            await interaction.editReply({ content: 'Here\'s your text file!', files: [file] });
        });
    },
};
