import { Model, Sequelize, DataTypes } from 'sequelize';

class Product extends Model {
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
      as: 'category',
    });
    this.belongsTo(models.File, {
      foreignKey: 'image_id',
      as: 'image',
    });
  }
}

export default Product;
