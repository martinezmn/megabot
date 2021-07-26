const validateHelper = require('../helpers/validate.helper');
const ConfigMessages = require('../messages/config.messages');
const Guild = require('../models/Guild');

module.exports = class ConfigController {
    static async index(guildConfig, message, args) {
        if (!args.length) {
            return await ConfigMessages.index(guildConfig, message);
        }

        const action = args.shift();
        args = args.join(' ');

        if (!args.length) {
            return await ConfigMessages.error(guildConfig, message);
        }

        if (action == 'set-prefix') {
            if (!await validateHelper.prefix(args)) {
                return await ConfigMessages.error(guildConfig, message);
            }

            await Guild.setConfig(message.channel.guild.id, 'prefix', args);
            return await ConfigMessages.success(guildConfig, message, 'Prefixo', guildConfig.prefix, args);
        }

        if (action == 'set-timezone') {
            if (!await validateHelper.timezone(args)) {
                return await ConfigMessages.error(guildConfig, message);
            }

            await Guild.setConfig(message.channel.guild.id, 'timezone', args);
            return await ConfigMessages.success(guildConfig, message, 'Fuso horário', guildConfig.timezone, args);
        }

        if (action == 'set-card-color') {
            if (!await validateHelper.cardColor(args)) {
                return await ConfigMessages.error(guildConfig, message);
            }

            const before = guildConfig.card_color;
            guildConfig.card_color = args;
            
            await Guild.setConfig(message.channel.guild.id, 'card_color', args);
            return await ConfigMessages.success(guildConfig, message, 'Cor dos cards', before, args);
        }

        if (action == 'set-admin-role') {
            if (!await validateHelper.adminRole(args)) {
                return await ConfigMessages.error(guildConfig, message);
            }

            await Guild.setConfig(message.channel.guild.id, 'admin_role', args);
            return await ConfigMessages.success(guildConfig, message, 'Cargo de admin', guildConfig.admin_role, args);
        }
    }
}
