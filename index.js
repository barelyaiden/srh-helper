const { Client, Collection, Intents } = require('discord.js');
const { Sequelize, DataTypes } = require('sequelize');
const fs = require('fs');
const config = require('./config.json');
const { token } = require('./token.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

const sequelizeRippedAssets = new Sequelize({
    dialect: 'sqlite',
    logging: false,
    storage: './databases/rippedAssets.sqlite'
});

client.config = config;
client.RippedAssets = sequelizeRippedAssets.define('RippedAssets', {
    game: DataTypes.TEXT,
    category: DataTypes.TEXT,
    author: DataTypes.TEXT,
    name: DataTypes.TEXT,
    link: DataTypes.TEXT
});

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const event = require(`./events/${file}`);

    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

client.login(token);
