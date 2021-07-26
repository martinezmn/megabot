const Discord = require('discord.js');
const dateHelper = require('../helpers/date.helper');

module.exports = class StatusMessages {
    static async registeredHours(guildConfig, message, member) {
        let msg = new Discord.MessageEmbed();

        const user = message.guild.members.cache.get(member.dataValues.member_id)?.user;

        if (user) {
            msg.setAuthor(user.username, user.displayAvatarURL());
        }

        msg.setColor(guildConfig.card_color);
        msg.setDescription(`Horas registradas de <@!${member.dataValues.member_id}>`);
        msg.addFields(
            { name: 'Total da semana', value: await dateHelper.formatSeconds(member.dataValues.week_total) },
            { name: 'Total do mês', value: await dateHelper.formatSeconds(member.dataValues.month_total) },
            { name: 'Total do ano', value: await dateHelper.formatSeconds(member.dataValues.year_total) }
        );
        
        const last_login = await dateHelper.date(guildConfig.timezone, member.dataValues.updated_at);
        
        msg.setFooter(`Último acesso: ${last_login.formated}`);

        await message.channel.send(msg);
    }

    static async noRegisteredHours(guildConfig, message, memberId) {
        let msg = new Discord.MessageEmbed();

        msg.setColor(guildConfig.card_color);
        msg.setDescription(`O usuário <@!${memberId}> não possui horas registradas`);

        await message.channel.send(msg);
    }
}
