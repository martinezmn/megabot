const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config();

const Guild = require('./models/Guild');

console.info(new Date(), 'Starting to load commands');
const commandsList = require('./commands');
const Commands = {};
for (const each of commandsList) {
    Commands[each.command] = each;
}
console.info(new Date(), 'Commands loaded sucessfully');

console.info(new Date(), 'Starting to load events');
const Events = require('./events');
console.info(new Date(), 'Events loaded sucessfully');

console.info(new Date(), 'Connecting to database');
require('./database');
console.info(new Date(), 'Database connected');

client.on('ready', () => {
    bot.user.setPresence({
        status: 'online',
        activity: {
            name: '!help',
            type: "Listening"
        }
    }
                         
    console.info(new Date(), `Started logged as ${client.user.tag}!`);

    // for (const channel of client.channels.cache.values()) {
    //     if (channel.type == 'voice') {
    //         console.log(channel);
    //     }
    // }
});

client.on("guildCreate", async guild => {
    await Guild.create({ id: guild.id }, { ignoreDuplicates: true });
});

client.on('message', async message => {
    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;

    guildConfig = await Guild.getConfig(message.channel.guild.id);

    if (message.content.charAt(0) != guildConfig.prefix) {
        return;
    }

    const args = message.content.slice(guildConfig.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLocaleLowerCase();

    if (!Commands[command]) {
        return;
    }

    if (!Commands[command].onlyAdmin) {
        return await Commands[command].action(guildConfig, message, args);
    }
    
    if (message.member.hasPermission('ADMINISTRATOR') || message.member.roles.cache.some(role => role.name === guildConfig.admin_role)) {
        return await Commands[command].action(guildConfig, message, args);
    } else {
        return await message.channel.send(`O comando \`${command}\` é exclusivo do cargo \`${guildConfig.admin_role}\``);
    }
});

client.on('voiceStateUpdate', async (oldState, newState) => {
    for (const event of Events) {
        if (event.event === 'voiceStateUpdate') {
            guildConfig = await Guild.getConfig(newState.guild.id);
            await event.action(guildConfig, oldState, newState);
        }
    }
});

for (const event of Events) {
    if (event.event === 'loop') {
        setInterval(async function () {
            await event.action();
        }, event.delay);
    }
}


client.login(process.env.TOKEN);
