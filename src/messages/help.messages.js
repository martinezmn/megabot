const Discord = require('discord.js');

module.exports = class HelpMessages {
    static async index(guildConfig, message, forAllCommands, onlyAdminCommands) {
        let msg = new Discord.MessageEmbed();

        const user = message.guild.members.cache.get(process.env.CLIENT_ID).user;

        msg.setColor(guildConfig.card_color);
        msg.setAuthor(`Comandos do ${process.env.BOT_NAME}`, user.displayAvatarURL());
        msg.setThumbnail(user.displayAvatarURL());
        msg.setFooter(`Fuso horário: UTC ${guildConfig.timezone}`);
        if (forAllCommands.length > 0) {
            msg.addFields({ name: 'Para todos', value: forAllCommands });
        }
        if (onlyAdminCommands.length > 0) {
            msg.addFields({ name: 'Administradores', value: onlyAdminCommands });
        }

        await message.channel.send(msg);
    }
}
