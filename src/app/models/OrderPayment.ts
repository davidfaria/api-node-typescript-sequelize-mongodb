import { Model, Sequelize, DataTypes } from 'sequelize';

class OrderPayment extends Model {
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
        user_id: {
          type: DataTypes.INTEGER,
          references: { model: 'users', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'RESTRICT',
          allowNull: false,
        },
        payment_methods_id: {
          type: DataTypes.INTEGER,
          references: { model: 'payment_methods', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'RESTRICT',
          allowNull: false,
        },
        installments_date: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        installments: {
          type: DataTypes.INTEGER,
          allowNull: false,
          default: 1,
        },
        installments_of: {
          type: DataTypes.INTEGER,
          allowNull: false,
          default: 1,
        },
        price: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
          default: 0.0,
        },
        paid: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          default: false,
        },
        pay_at: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      {
        tableName: 'order_payments',
        sequelize,
      },
    );

    return this;
  }
}

export default OrderPayment;
