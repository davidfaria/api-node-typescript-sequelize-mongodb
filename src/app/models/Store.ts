import { Sequelize, Model, DataTypes } from 'sequelize';

class Store extends Model {
  static initialize(sequelize: Sequelize) {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        logo_id: {
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
        phone: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        cell_phone: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        email: {
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
        tableName: 'stores',
        sequelize,
      },
    );

    return this;
  }

  static associate(models: any) {
    this.belongsTo(models.File, { foreignKey: 'logo_id', as: 'logo' });
  }
}

export default Store;
