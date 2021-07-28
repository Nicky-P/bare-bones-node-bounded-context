import { Sequelize, Dialect } from 'sequelize';
import examplesModel from './examples.model';
import { nodeEnv } from '../config';
var dbConfig = require('../config/db.config');

const envDBConfig = nodeEnv == 'production' ? dbConfig.production : dbConfig.development;

const sequelize = new Sequelize(envDBConfig.database, envDBConfig.username, envDBConfig.password, {
  host: envDBConfig.host,
  dialect: envDBConfig.dialect as Dialect,
  pool: {
    max: envDBConfig.pool.max,
    min: envDBConfig.pool.min,
    acquire: envDBConfig.pool.acquire,
    idle: envDBConfig.pool.idle,
  },
});

const db = {
  Sequelize: Sequelize,
  sequelize: sequelize,
  examples: examplesModel(sequelize),
};

export default db;
