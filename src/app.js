const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config();

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
    console.info(new Date(), `Started logged as ${client.user.tag}!`);

    // for (const channel of client.channels.cache.values()) {
    //     if (channel.type == 'voice') {
    //         console.log(channel);
    //     }
    // }
});

client.on("guildCreate", guild => {
    console.log('NOVA GUILD');
});

client.on('message', async message => {
    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;

    if (message.content.charAt(0) != process.env.PREFIX) {
        return;
    }

    const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/g);
    const command = args.shift().toLocaleLowerCase();

    if (!Commands[command]) {
        return;
    }

    if (!Commands[command].onlyAdmin) {
        return await Commands[command].action(message, args);
    }
    
    if (message.member.hasPermission('ADMINISTRATOR') || message.member.roles.cache.some(role => role.name === process.env.ADMIN_ROLE)) {
        return await Commands[command].action(message, args);
    } else {
        return await message.channel.send(`O comando \`${command}\` é exclusivo do cargo \`${process.env.ADMIN_ROLE}\``);
    }
});

client.on('voiceStateUpdate', async (oldState, newState) => {
    for (const event of Events) {
        if (event.event === 'voiceStateUpdate') {
            await event.action(oldState, newState);
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
