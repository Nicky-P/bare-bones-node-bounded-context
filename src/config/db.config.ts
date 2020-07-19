export default {
  HOST: 'localhost',
  USER: 'root',
  PASSWORD: 'test',
  DB: 'Example',
  dialect: 'mariadb',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
