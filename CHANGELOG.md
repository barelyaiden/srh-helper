## Release 2.0.7

- Export commands now appends the rip's name before the link

## Release 2.0.6

- Added category for Sonic Superstars

## Release 2.0.5

- Bump Discord.js to 14.8.0.

## Release 2.0.4

- Added an error handler for global unpromised rejections.

## Release 2.0.3

- Small code refactoring.
- Attempt to fix the bot constantly crashing.

## Release 2.0.2

- Bot commands can no longer be used outside of the designated channel unless you're a moderator.

## Release 2.0.1

- Added the export command.

## Release 2.0.0

- Ported to Discord.js v14.
- Added category for Sonic Frontiers.
- Updated the /usage command with new GIFs.
- The bot is now enjoying Sonic Frontiers 24/7!

## Release 1.2.0

- Updated the dependencies.
- Updated the README file with more up-to-date information.
- Updated the `client` object's intents to match the ones on the Bot account set-up page.
- Deleted the `deploy-global-commands.js` script and renamed the `deploy-guild-commands.js` script to `deploy-commands.js`.
- Removed the command Ids from the configuration file as setting slash command permissions through bots is not needed anymore.
- Fixed one of the database backups being ignored when pushing to the repository.
- Fixed line endings in the `.eslintrc.json` file (switched from Unix to Windows).
- Updated the `.setAuthor()` and `.setFooter()` functions as they require an object for the argument now.
- Updated choices in the command files to use the new `.addChoices()` function instead of the deprecated `.addChoice()` one.
- Removed the code that sets permissions for specific slash commands (this can be done via the server settings in the Discord client now).
- Commands that interact with the database now publicly show any metadata used.
- Updated the bot author and special thanks section of the About command.

## Release 1.1.2

- Improved the description of the "GitHub" page on the "About" command.
- The bot now sends usage GIFs as attachments rather than sending links.
- The current page of multiple embeds is now shown on the embed footer rather than as plain text above the embed.
- Restructured the configuration file.

## Release 1.1.1

- Renamed "Sonic Colors" to "Sonic Colors Series" in the games options lists.
- Buttons now disappear after they get inactive.
- Arrow buttons now have consistent design between platforms.

## Release 1.1.0

- Added pages to the "Rips" command.
- Added "Usage" command.

## Release 1.0.1

- Added version indicator to the "Library" field in the "About" embed.
- Added "GitHub" and "Special Thanks" menus to the "About" command.
- Added "Sonic R" and "Sonic Mobile Games" options to the games lists.

## Release 1.0.0

- Initial release.
