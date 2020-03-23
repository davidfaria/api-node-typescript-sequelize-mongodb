import { Model, Sequelize, DataTypes, BelongsTo } from 'sequelize';
import Category from '@models/Category';
import Store from '@models/Store';
import File from '@models/File';
class Product extends Model {
  public static associations: {
    category: BelongsTo<Product, Category>;
    store: BelongsTo<Product, Store>;
    image: BelongsTo<Product, File>;
  };

  static initialize(sequelize: Sequelize) {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        store_id: {
          type: DataTypes.INTEGER,
          references: { model: 'stores', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          allowNull: false,
        },
        category_id: {
          type: DataTypes.INTEGER,
          references: { model: 'categories', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
          allowNull: true,
          defaultValue: null,
        },
        image_id: {
          type: DataTypes.INTEGER,
          references: { model: 'files', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
          allowNull: true,
          defaultValue: null,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        reference: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        price: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
        price_cost: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
        amount: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        service: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
        status: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
      },
      {
        tableName: 'products',
        sequelize,
      },
    );

    return this;
  }

  static associate(models: any) {
    this.belongsTo(models.Category, {
      foreignKey: 'category_id',
      targetKey: 'id',
      as: 'category',
    });

    this.belongsTo(models.Store, {
      foreignKey: 'store_id',
      targetKey: 'id',
      as: 'store',
    });

    this.belongsTo(models.File, {
      foreignKey: 'image_id',
      targetKey: 'id',
      as: 'image',
    });
  }
}

export default Product;
