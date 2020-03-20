import '../bootstrap';
import { Options, Dialect } from 'sequelize';

export const databaseConfig: Options = {
  dialect: process.env.DB_DIALECT as Dialect,
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  define: {
    timestamps: true,
    underscored: true,
  },
  storage: './__tests__/database.sqlite',
  logging: false,
};
