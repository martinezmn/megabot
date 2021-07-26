const HelpMessages = require('../messages/help.messages');

module.exports = class HelpController {
    static async index(guildConfig, message, args) {

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

        return await HelpMessages.index(guildConfig, message, forAll, onlyAdmin);
    }
}
