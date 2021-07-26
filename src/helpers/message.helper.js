const Discord = require('discord.js');
const dateHelper = require('./date.helper');

module.exports = class messageHelper {
    static async sendHelpDetails(guildConfig, message, forAllCommands, onlyAdminCommands) {
        let msg = new Discord.MessageEmbed();

        const user = message.guild.members.cache.get(process.env.CLIENT_ID).user;

        msg.setColor(guildConfig.card_color);
        msg.setAuthor(`Comandos do ${process.env.BOT_NAME}`, user.displayAvatarURL());
        msg.setThumbnail(user.displayAvatarURL());
        if (forAllCommands.length > 0) {
            msg.addFields({ name: 'Para todos', value: forAllCommands });
        }
        if (onlyAdminCommands.length > 0) {
            msg.addFields({ name: process.env.ADMIN_ROLE, value: onlyAdminCommands });
        }

        await message.channel.send(msg);
    }

    static async sendRegisteredHours(guildConfig, message, member) {
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

    static async sendNoRegisteredHours(guildConfig, message, memberId) {
        let msg = new Discord.MessageEmbed();

        msg.setColor(guildConfig.card_color);
        msg.setDescription(`O usuário <@!${memberId}> não possui horas registradas`);

        await message.channel.send(msg);
    }
}
