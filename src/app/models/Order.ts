import { Model, Sequelize, DataTypes } from 'sequelize';

class Order extends Model {
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
        user_id: {
          type: DataTypes.INTEGER,
          references: { model: 'users', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'RESTRICT',
          allowNull: false,
        },
        employee_id: {
          type: DataTypes.INTEGER,
          references: { model: 'employees', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'RESTRICT',
          allowNull: false,
        },
        customer_id: {
          type: DataTypes.INTEGER,
          references: { model: 'customers', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'RESTRICT',
          allowNull: false,
        },
        order_date: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        type: {
          type: DataTypes.ENUM('Orçamento', 'Venda'),
          allowNull: false,
          defaultValue: 'Orçamento',
        },
        status: {
          type: DataTypes.ENUM(
            'Pendente',
            'Aguardando Pagamento',
            'Finalizada',
          ),
          allowNull: false,
          defaultValue: 'Pendente',
        },
        total: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
          default: 0.0,
        },
        discount: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
          default: 0.0,
        },
        phone: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        cell_phone: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        zipcode: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        street: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        number: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        neighborhood: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        city: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        state: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        complement: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        note: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
      },
      {
        tableName: 'orders',
        sequelize,
      },
    );

    return this;
  }
}

export default Order;
