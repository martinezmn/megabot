module.exports = class PingController {
    static async index(guildConfig, message, args) {
        const m = await message.channel.send('Pong!');
        m.edit(`Pong! ${m.createdTimestamp - message.createdTimestamp}ms.`);
    }
}
