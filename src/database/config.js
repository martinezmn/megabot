require('dotenv').config();

module.exports = {
    dialect: 'mysql',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    logging: false,
    timezone: process.env.TIMEZONE,
    define: {
        charset: 'utf8',
        dialectOptions: {
            collate: 'utf8_general_ci',
            useUTC: false
        },
        timestamps: true,
        underscored: true
    }
};
