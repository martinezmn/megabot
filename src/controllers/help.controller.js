const Discord = require('discord.js');
const messageHelper = require('../helpers/message.helper');

module.exports = class HelpController {
    static async help(message, args) {

        const commandsList = require('../commands');

        let forAll = '';
        let onlyAdmin = '';

        for (const each of commandsList) {
            if (each.onlyAdmin) {
                onlyAdmin += `\`${each.command}\`, `;
            } else {
                forAll += `\`${each.command}\`, `;
            }
        }

        forAll = forAll.replace(/,\s*$/, "");
        onlyAdmin = onlyAdmin.replace(/,\s*$/, "");

        return messageHelper.sendHelpDetails(message, forAll, onlyAdmin);
    }
}
