import { Sequelize } from 'sequelize';
import mongoose from 'mongoose';
import { databaseConfig } from '@config/database';

/**
 * Models Sequelize
 */
import User from '@models/User';
import File from '@models/File';

class Database {
  public connection: any;
  public models = [File, User];

  constructor() {
    this.init();
    this.mongo();
  }

  init(): void {
    this.connection = new Sequelize(databaseConfig);
    this.models
      .map(model => model.initialize(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }

  private mongo(): void {
    let MONGO_URL: string | any;

    if (process.env.NODE_ENV !== 'test') {
      MONGO_URL = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE}`;
    } else {
      /**
       *  Carrega a URL do mongodb-jest
       */
      MONGO_URL = process.env.MONGO_URL;
    }

    mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  }
}

export default Database;
