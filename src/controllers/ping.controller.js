module.exports = class PingController {
    static async ping(message, args) {
        const m = await message.channel.send('Pong!');
        m.edit(`Pong! ${m.createdTimestamp - message.createdTimestamp}ms.`);
    }
}
