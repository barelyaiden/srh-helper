# SRH Helper
## A Discord bot designed to help ease the process of sharing assets in the Sonic Ripping Hub.

If you would like to join any of the servers associated with the project, Discord server invite links are provided below:

- [Sonic Ripping Hub](https://discord.gg/UyEgu8M)
- [SRH Helper](https://discord.gg/a672jA2bct)

# Additional Information

- This bot is written in `Discord.js 13` and requires `Node.js 16.6.0` or higher to run as per `Discord.js 13` requirements.
- You will need to install build tools if you haven't already to be able to install some dependencies that require to be compiled.
- **FOR WINDOWS SYSTEMS YOU CAN USE THIS TUTORIAL TO INSTALL IT: [TUTORIAL](https://www.youtube.com/watch?v=P4_R34Lb-PE)**
- All commands are global slash commands and require to be deployed via a separate script (for now).
- **KEEP IN MIND IT TAKES ONE HOUR TO REGISTER ANY CHANGES IF YOU DEPLOY AGAIN TO UPDATE EXISTING COMMANDS.**
- **FOR THIS REASON MAKE SURE TO USE THE `deploy-guild-commands.js` SCRIPT AS UPDATING COMMANDS IN A GUILD IS FASTER, ESPECIALLY FOR RAPID TESTING.**
- This bot is designed for the `Sonic Ripping Hub` Discord server and is **NOT** meant to work on other servers.
- You **MUST** have a decent grasp of JavaScript, Node.js and Discord.js to be able to contribute to the project.
- Your test bot account **MUST** have all privileged gateway intents enabled to function properly.

![priviligedGatewayIntents](https://cdn.discordapp.com/attachments/880464361175547935/881088273328529468/unknown.png)
- You **MUST** invite your test bot account to your testing server with the `bot` and `applications.commands` scopes and the `Administrator` permission via OAuth2.

![inviteLink](https://cdn.discordapp.com/attachments/880464361175547935/881091246548987904/unknown.png)
- **YOU NEED TO USE THE LINK GENERATED BY OAuth2 WITH THESE FLAGS TO INVITE THE TEST BOT ACCOUNT TO YOUR TESTING SERVER.**

# How To Set Up A Development Environment (For Contributors)

1. Fork the repository.
2. Run a terminal in the root directory of the project and use the `npm install` command to install all dependencies.
3. Create a `token.json` file in the root directory of the project with the following code snippet inside:
```
{
    "token": "insertYourTestBotTokenHere"
}
```
- **MAKE SURE TO REPLACE `insertYourTestBotTokenHere` WITH YOUR OWN TEST BOT ACCOUNT'S TOKEN.**
- **DO NOT SHARE YOUR TEST BOT ACCOUNT'S TOKEN AS THAT WILL ALLOW OTHERS TO RUN THEIR OWN (AND VERY LIKELY MALICIOUS) CODE ON YOUR TEST BOT ACCOUNT.**
4. Modify the `config.json` file with your own IDs and role names.
5. To deploy commands:
- For rapid testing run the `node deploy-guild-commands.js` command in your terminal.
- **THIS WILL REGISTER YOUR COMMANDS ONLY IN YOUR TESTING SERVER, THE ID OF WHICH YOU WILL HAVE TO PROVIDE IN THE CONFIGURATION FILE.**
- For registering commands globally run the `deploy-global-commands.js` command in your terminal.
- **THIS WILL ALLOW YOUR COMMANDS TO BE RUN ON ANY SERVER THE BOT IS IN, AT THE COST OF TAKING AN HOUR TO UPDATE ANY EXISTING COMMANDS.**
6. To start the bot use the `node .` command in your terminal (and stop the bot by using `Ctrl + C` inside your terminal).
