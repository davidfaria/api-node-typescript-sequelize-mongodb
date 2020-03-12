import { Sequelize } from 'sequelize';
import mongoose from 'mongoose';
import { databaseConfig } from '@config/database';

/**
 * Models Sequelize
 */
import User from '@models/User';
import File from '@models/File';
import Role from '@models/Role';
import Permission from '@models/Permission';

class Database {
  public connection: any;
  public models = [File, User, Role, Permission];

  constructor() {
    this.init();
    this.mongo();
  }

  init(): void {
    this.connection = new Sequelize(databaseConfig);
    this.models
      .map(model => model.initialize(this.connection))
      .map(
        (model: any) =>
          model.associate && model.associate(this.connection.models),
      );
  }

  private mongo(): void {
    // mongoose.connect(<string>process.env.MONGO_URL, {
    //   useNewUrlParser: true,
    //   useFindAndModify: true,
    //   useUnifiedTopology: true,
    //   useCreateIndex: true,
    // });
  }
}

export default Database;
