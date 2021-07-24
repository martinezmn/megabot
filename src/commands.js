const HelpController = require('./controllers/help.controller');
const PingController = require('./controllers/ping.controller');
const StatusController = require('./controllers/status.controller');

module.exports = [
    {
        command: 'ping',
        action: PingController.ping
    },
    {
        command: 'help',
        onlyAdmin: false,
        action: HelpController.help
    },
    {
        command: 'status',
        action: StatusController.getStatus
    }
];
