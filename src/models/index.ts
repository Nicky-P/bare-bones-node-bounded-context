import dbConfig from '../config/db.config';
import { Sequelize, Dialect } from 'sequelize';
import examplesModel from './examples.model';

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect as Dialect,
  dialectOptions: {
    timezone: process.env.db_timezone,
  },

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {
  Sequelize: Sequelize,
  sequelize: sequelize,
  examples: examplesModel(sequelize),
};

export default db;
