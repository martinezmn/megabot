const StatusController = require('./controllers/status.controller');

module.exports = [
    {
        event: 'voiceStateUpdate',
        action: StatusController.isOnline
    },
    {
        event: 'voiceStateUpdate',
        action: StatusController.isOffline
    },
    // {
    //     event: 'loop',
    //     delay: 30000,
    //     action: PingController.pong
    // },
];