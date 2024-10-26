# SRH Helper
## A Discord bot designed to help ease the process of sharing assets in the Sonic Ripping Hub.

If you would like to join any of the servers associated with the project, Discord server invite links are provided below:

- [Sonic Ripping Hub](https://discord.gg/UyEgu8M)
- [SRH Helper](https://discord.gg/a672jA2bct)

# Additional Information

- This bot is written in `Discord.js 14` and requires `Node.js 20` or higher to run as per `Discord.js 14` requirements.
- This bot is designed for the `Sonic Ripping Hub` Discord server and is not meant to work on other servers.
- Your test bot account must have all privileged gateway intents enabled to function properly.
- You must invite your test bot account to your testing server with the `bot` and `applications.commands` scopes and the `Administrator` permission via OAuth2.

# How To Set Up A Development Environment

1. Fork the repository.
2. Run a terminal in the root directory of the project and use the `npm install` command to install all dependencies.
3. Create a `.env` file in the root directory of the project with the following code snippet inside:
```
DISCORD_TOKEN=yourtokenhere
```
- **MAKE SURE TO REPLACE `yourtokenhere` WITH YOUR OWN TEST BOT ACCOUNT'S TOKEN.**
- **DO NOT SHARE YOUR TEST BOT ACCOUNT'S TOKEN AS THAT WILL ALLOW OTHERS TO RUN THEIR OWN (AND VERY LIKELY MALICIOUS) CODE ON YOUR TEST BOT ACCOUNT.**
4. Modify the `config.json` file with your own IDs and role names.
5. To deploy commands run the `node deploy-commands.js` command in your terminal.
- **THIS WILL REGISTER YOUR COMMANDS ONLY IN YOUR TESTING SERVER, THE ID OF WHICH YOU WILL HAVE TO PROVIDE IN THE CONFIGURATION FILE.**
6. To start the bot use the `node .` command in your terminal (and stop the bot by using `Ctrl + C` inside your terminal).
