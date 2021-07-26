const moment = require('moment');

module.exports = class dateHelper {
    static async date(date = null) {
        if (!date) {
            date = new Date();
        }
        
        let momentDate = moment(date).utcOffset(process.env.TIMEZONE);

        return {
            now: date,
            formated: momentDate.format('DD-MM-YYYY HH:mm:ss'),
            week: momentDate.week(),
            month: momentDate.month() + 1,
            year: momentDate.year(),
        }
    }

    static async getSeconds(start, end) {
        const startTime = moment(start);
        const endTime = moment(end);

        const duration = moment.duration(endTime.diff(startTime));

        return parseInt(duration.asSeconds());
    }

    static async formatSeconds(seconds) {
        return `${Math.floor(seconds / 3600)} horas, ${Math.floor((seconds % 3600) / 60)} minutos e ${seconds % 60} segundos`;
    }
}
