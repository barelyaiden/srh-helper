const fs = require('node:fs');
const path = require('node:path');
const { Sequelize, DataTypes } = require('sequelize');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const config = require('./config.json');
require('dotenv').config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const sequelize = new Sequelize({
    dialect: 'sqlite',
    logging: false,
    storage: './databases/rippedAssets.sqlite',
});

client.commands = new Collection();
client.RippedAssets = sequelize.define('RippedAssets', {
    game: DataTypes.TEXT,
    category: DataTypes.TEXT,
    author: DataTypes.TEXT,
    name: DataTypes.TEXT,
    link: DataTypes.TEXT
});
client.config = config;

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);

    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

process.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error);
});

client.login(process.env.DISCORD_TOKEN);
