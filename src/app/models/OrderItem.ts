import { Model, Sequelize, DataTypes } from 'sequelize';

class OrderItem extends Model {
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
        order_id: {
          type: DataTypes.INTEGER,
          references: { model: 'orders', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'RESTRICT',
          allowNull: false,
        },
        product_id: {
          type: DataTypes.INTEGER,
          references: { model: 'products', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'RESTRICT',
          allowNull: false,
        },
        amount: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
        price: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
          default: 0.0,
        },
        discount: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
          default: 0.0,
        },
        total: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
          default: 0.0,
        },
      },
      {
        tableName: 'order_itens',
        sequelize,
      },
    );

    return this;
  }
}

export default OrderItem;
