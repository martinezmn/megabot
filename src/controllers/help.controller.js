const Discord = require('discord.js');
const messageHelper = require('../helpers/message.helper');

module.exports = class HelpController {
    static async help(guildConfig, message, args) {

        const commandsList = require('../commands');

        let forAll = '';
        let onlyAdmin = '';

        for (const each of commandsList) {
            if (each.onlyAdmin) {
                onlyAdmin += `\`${guildConfig.prefix}${each.command}\`, `;
            } else {
                forAll += `\`${guildConfig.prefix}${each.command}\`, `;
            }
        }

        forAll = forAll.replace(/,\s*$/, "");
        onlyAdmin = onlyAdmin.replace(/,\s*$/, "");

        return messageHelper.sendHelpDetails(guildConfig, message, forAll, onlyAdmin);
    }
}
