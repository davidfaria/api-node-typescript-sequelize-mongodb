import { Sequelize } from 'sequelize';
import mongoose from 'mongoose';
import { databaseConfig } from '@config/database';

/**
 * Models Sequelize
 */
import File from '@models/File';
import Store from '@models/Store';
import User from '@models/User';
import UserStore from '@models/UserStore';
import Role from '@models/Role';
import Permission from '@models/Permission';
import UserPermission from '@models/UserPermission';
import Category from '@models/Category';
import Product from '@models/Product';
import Customer from '@models/Customer';
import Order from '@models/Order';
import OrderItem from '@models/OrderItem';
import OrderPayment from '@models/OrderPayment';

class Database {
  public connection: any;
  public models = [
    File,
    Store,
    User,
    UserStore,
    Role,
    Permission,
    UserPermission,
    Category,
    Product,
    Customer,
    Order,
    OrderItem,
    OrderPayment,
  ];

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
    console.log('MONGO_URL', process.env.MONGO_URL);
    const MONGO_URL: string = <any>process.env.MONGO_URL;

    mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  }
}

export default new Database();
