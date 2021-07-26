const ConfigController = require('./controllers/config.controller');
const HelpController = require('./controllers/help.controller');
const PingController = require('./controllers/ping.controller');
const StatusController = require('./controllers/status.controller');

module.exports = [
    {
        command: 'ping',
        action: PingController.index
    },
    {
        command: 'help',
        action: HelpController.index
    },
    {
        command: 'status',
        action: StatusController.index
    },
    {
        command: 'config',
        onlyAdmin: true,
        action: ConfigController.index
    }
];
