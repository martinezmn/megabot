const Sequelize = require('sequelize');
const dbConfig = require('./config');

const Member = require('../models/Member');
const MemberHours = require('../models/MemberHours');

const connection = new Sequelize(dbConfig);

Member.init(connection);
MemberHours.init(connection);

module.exports = connection;
