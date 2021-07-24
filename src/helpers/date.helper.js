const moment = require('moment');

module.exports = class dateHelper {
    static async date(date = null) {
        if (!date) {
            date = moment().utcOffset(process.env.TIMEZONE);
        }

        return {
            now: date.format(),
            week: date.week(),
            month: date.month() + 1,
            year: date.year(),
        }
    }

    static async getMinutes(start, end) {
        const startTime = moment(start);
        const endTime = moment(end);

        const duration = moment.duration(endTime.diff(startTime));

        return parseInt(duration.asMinutes());
    }

    static async formatMinutes(minutes) {
        return `${Math.floor(minutes / 60)} horas e ${minutes % 60} minutos`;
    }
}
