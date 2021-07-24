const Discord = require('discord.js');
const dateHelper = require('./date.helper');

module.exports = class messageHelper {
    static async sendHelpDetails(message, forAllCommands, onlyAdminCommands) {
        let msg = new Discord.MessageEmbed();

        msg.setColor(process.env.CARD_COLOR);
        msg.setAuthor('Comandos do MegaBot', message.author.displayAvatarURL());
        msg.setThumbnail('https://i.imgur.com/wSTFkRM.png');
        msg.addFields(
            { name: 'Para todos', value: forAllCommands },
            { name: process.env.ADMIN_ROLE, value: onlyAdminCommands }
        );

        await message.channel.send(msg);
    }

    static async sendRegisteredHours(message, member) {
        let msg = new Discord.MessageEmbed();

        const user = message.guild.members.cache.get(member.dataValues.member_id).user;

        msg.setColor(process.env.CARD_COLOR);
        msg.setAuthor(user.username, user.displayAvatarURL())
        msg.setDescription(`Horas registradas de <@!${member.dataValues.member_id}>`);
        msg.addFields(
            { name: 'Total da semana', value: await dateHelper.formatMinutes(member.dataValues.week_total) },
            { name: 'Total do mês', value: await dateHelper.formatMinutes(member.dataValues.month_total) },
            { name: 'Total do ano', value: await dateHelper.formatMinutes(member.dataValues.year_total) }
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
