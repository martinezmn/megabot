const MemberHours = require('../models/MemberHours');
const StatusMessages = require('..//messages/status.messages');

module.exports = class StatusController {
    static async index(guildConfig, message, args) {
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
                StatusMessages.registeredHours(guildConfig, message, member);
            }

            return;
        }

        for (const value of args) {
            const id = value.replace(/\D/g, '');

            const memberHours = await MemberHours.findOne({ where: { member_id: id, guild_id: message.channel.guild.id }});

            if (!memberHours) {
                return StatusMessages.noRegisteredHours(guildConfig, message, id)
            }

            StatusMessages.registeredHours(guildConfig, message, memberHours);
        }
    }

    static async isOnline(guildConfig, oldState, newState) {
        if (newState.channelID && newState.channelID != newState.guild.afkChannelID) {
            if (await MemberHours.setOnline(guildConfig, newState)) {
                console.log(`User ${newState.id} is online`);
            }
        }
    }

    static async isOffline(guildConfig, oldState, newState) {
        if (!newState.channelID || newState.channelID == newState.guild.afkChannelID) {
            if (await MemberHours.setOffline(guildConfig, newState)) {
                console.log(`User ${newState.id} is offline`);
            }
        }
    }
}
