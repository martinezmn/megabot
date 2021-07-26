const MemberHours = require('../models/MemberHours');
const messageHelper = require('../helpers/message.helper');

module.exports = class StatusController {
    static async getStatus(guildConfig, message, args) {
        if (args.includes('all')) {
            if (args.length > 1) {
                return await message.channel.send('O parâmetro `all` não deve ser utilizado junto com outros parâmetros');
            }

            const memberHours = await MemberHours.findAll({
                where: {
                    guild_id: message.channel.guild.id
                }
            });

            for (const member of memberHours) {
                messageHelper.sendRegisteredHours(guildConfig, message, member);
            }

            return;
        }

        for (const value of args) {
            const id = value.replace(/\D/g, '');

            const memberHours = await MemberHours.findByPk(id);

            if (!memberHours) {
                return messageHelper.sendNoRegisteredHours(guildConfig, message, id)
            }

            messageHelper.sendRegisteredHours(guildConfig, message, memberHours);
        }
    }

    static async isOnline(guildConfig, oldState, newState) {
        if (newState.channelID && newState.channelID != newState.guild.afkChannelID) {
            if (await MemberHours.setOnline(guildConfig, newState)) {
                console.log(`User ${newState.id} is online`);
            }
        }
    }

    static async isOffline(oldState, newState) {
        if (!newState.channelID || newState.channelID == newState.guild.afkChannelID) {
            if (await MemberHours.setOffline(newState)) {
                console.log(`User ${newState.id} is offline`);
            }
        }
    }


}
