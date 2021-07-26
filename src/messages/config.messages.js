const Discord = require('discord.js');

module.exports = class ConfigMessages {
    static async index(guildConfig, message) {
        let msg = new Discord.MessageEmbed();

        const user = message.guild.members.cache.get(process.env.CLIENT_ID).user;

        msg.setColor(guildConfig.card_color);
        msg.setThumbnail(user.displayAvatarURL());
        msg.setAuthor(`Configurações do ${process.env.BOT_NAME}`, user.displayAvatarURL());

        msg.addFields(
            { name: 'Editar prefixo', value: `Ex: \`${guildConfig.prefix}config set-prefix ${process.env.PREFIX}\`` },
            { name: 'Editar fuso horário', value: `Ex: \`${guildConfig.prefix}config set-timezone ${process.env.TIMEZONE}\`` },
            { name: 'Editar cor dos cards', value: `Ex: \`${guildConfig.prefix}config set-card-color ${process.env.CARD_COLOR}\`` },
            { name: 'Editar cargo de admin', value: `Ex: \`${guildConfig.prefix}config set-admin-role ${process.env.ADMIN_ROLE}\`` },
        );

        await message.channel.send(msg);
    }

    static async error(guildConfig, message) {
        let msg = new Discord.MessageEmbed();

        const user = message.guild.members.cache.get(process.env.CLIENT_ID).user;

        msg.setColor(guildConfig.card_color);
        msg.setAuthor(`Configurações do ${process.env.BOT_NAME}`, user.displayAvatarURL());
        msg.setDescription(`Parâmetros inválidos. Use \`${guildConfig.prefix}config\` para ver exemplos válidos`);

        await message.channel.send(msg);
    }

    static async success(guildConfig, message, attribute, before, after) {
        let msg = new Discord.MessageEmbed();

        const user = message.guild.members.cache.get(process.env.CLIENT_ID).user;

        msg.setColor(guildConfig.card_color);
        msg.setAuthor(`Configurações do ${process.env.BOT_NAME}`, user.displayAvatarURL());
        msg.setDescription(`${attribute} alterado de \`${before}\` para \`${after}\` com sucesso`);

        await message.channel.send(msg);
    }
}
