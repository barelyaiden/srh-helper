# SRH Helper
## A Discord bot designed to help ease the process of sharing assets in the Sonic Ripping Hub.

If you would like to join any of the servers associated with the project, Discord server invite links are provided below:

- [Sonic Ripping Hub](https://discord.gg/UyEgu8M)
- [SRH Helper](https://discord.gg/a672jA2bct)

# Additional Information

- This bot is written in `Discord.js 13` and requires `Node.js 16.6.0` or higher to run as per `Discord.js 13` requirements.
- All commands are global slash commands and require to be deployed via a separate script (for now).
- This bot is designed for the `Sonic Ripping Hub` Discord server and is **not** meant to work on other servers.
- You **must** have a decent grasp of JavaScript, Node.js and Discord.js to be able to contribute to the project.
- Your test bot account **must** have all privileged gateway intents enabled to function properly.

![priviligedGatewayIntents](https://cdn.discordapp.com/attachments/880464361175547935/881088273328529468/unknown.png)
- You **must** invite your test bot account to your testing server with the `bot` and `applications.commands` scopes and the `Administrator` permission via OAuth2.

![inviteLink](https://cdn.discordapp.com/attachments/880464361175547935/881091246548987904/unknown.png)
- **You need to use the link generated by OAuth2 with these flags to invite the test bot account to your testing server.**

# How To Set Up A Development Environment (For Contributors)

1. Fork the repository.
2. Run a terminal in the root directory of the project and use the `npm install` command to install all dependencies.
3. Create a `token.json` file in the root directory of the project with the following code snippet inside:
```
{
    "token": "insertYourTestBotTokenHere"
}
```
- **Make sure to replace `insertYourTestBotTokenHere` with your own test bot account's token.**
- **Do not share your test bot account's token as that will allow others to run their own (and very likely malicious) code on your test bot account.**
4. To deploy commands run the deployment script by using the `node deploy-commands.js` command in your terminal and let it finish.
5. To start the bot use the `node .` command in your terminal (and stop the bot by using `Ctrl + C` inside your terminal).
