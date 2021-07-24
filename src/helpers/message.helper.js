const Discord = require('discord.js');
const dateHelper = require('./date.helper');

module.exports = class messageHelper {
    static async sendHelpDetails(message, forAllCommands, onlyAdminCommands) {
        let msg = new Discord.MessageEmbed();

        const user = message.guild.members.cache.get(process.env.CLIENT_ID).user;

        msg.setColor(process.env.CARD_COLOR);
        msg.setAuthor('Comandos do MegaBot', user.displayAvatarURL());
        msg.setThumbnail(user.displayAvatarURL());
        msg.addFields({ name: 'Para todos', value: forAllCommands });
        if (onlyAdminCommands.length > 0) {
            msg.addFields({ name: process.env.ADMIN_ROLE, value: onlyAdminCommands });
        }

        await message.channel.send(msg);
    }

    static async sendRegisteredHours(message, member) {
        let msg = new Discord.MessageEmbed();

        const user = message.guild.members.cache.get(member.dataValues.member_id)?.user;

        if (user) {
            msg.setAuthor(user.username, user.displayAvatarURL());
        }

        msg.setColor(process.env.CARD_COLOR);
        msg.setDescription(`Horas registradas de <@!${member.dataValues.member_id}>`);
        msg.addFields(
            { name: 'Total da semana', value: await dateHelper.formatSeconds(member.dataValues.week_total) },
            { name: 'Total do mês', value: await dateHelper.formatSeconds(member.dataValues.month_total) },
            { name: 'Total do ano', value: await dateHelper.formatSeconds(member.dataValues.year_total) }
        );

        await message.channel.send(msg);
    }

    static async sendNoRegisteredHours(message, memberId) {
        let msg = new Discord.MessageEmbed();

        msg.setColor(process.env.CARD_COLOR);
        msg.setDescription(`O usuário <@!${memberId}> não possui horas registradas`);

        await message.channel.send(msg);
    }
}
