import { Model, Sequelize, DataTypes } from 'sequelize';

class Customer extends Model {
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
        foto_id: {
          type: DataTypes.INTEGER,
          references: { model: 'files', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
          allowNull: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        genre: {
          type: DataTypes.ENUM('Masculino', 'Feminino', 'Outros'),
          allowNull: false,
          defaultValue: 'Outros',
        },
        birthdate: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        type_document: {
          type: DataTypes.ENUM('PJ', 'PF'),
          allowNull: false,
          defaultValue: 'PJ',
        },
        document: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        ie: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        rg: {
          type: DataTypes.STRING,
          allowNull: true,
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
          type: DataTypes.STRING,
          allowNull: true,
        },
        status: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
      },
      {
        tableName: 'customers',
        sequelize,
      },
    );

    return this;
  }
}

export default Customer;
