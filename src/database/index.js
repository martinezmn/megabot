const Sequelize = require('sequelize');
const dbConfig = require('./config');

const Member = require('../models/Member');
const Guild = require('../models/Guild');
const MemberHours = require('../models/MemberHours');

const connection = new Sequelize(dbConfig);

Member.init(connection);
Guild.init(connection);
MemberHours.init(connection);

module.exports = connection;
