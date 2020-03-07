import '../bootstrap';
import { Sequelize } from 'sequelize';

const database = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'larawork',
  logging: false,
  storage: './__tests__/database.sqlite',
  define: {
    timestamps: true,
    underscored: true,
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

export default database;
