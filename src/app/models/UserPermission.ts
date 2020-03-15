import { Model, Sequelize, DataTypes } from 'sequelize';

class UserPermission extends Model {
  static initialize(sequelize: Sequelize) {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        user_id: {
          type: DataTypes.INTEGER,
          references: { model: 'users', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          allowNull: false,
        },
        permission_id: {
          type: DataTypes.INTEGER,
          references: { model: 'permissions', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          allowNull: false,
        },
      },
      {
        tableName: 'user_permissions',
        sequelize,
      },
    );

    return this;
  }

  static associate(models: any) {
    this.belongsTo(models.Permission, {
      foreignKey: 'permission_id',
      as: 'permission',
    });
  }
}

export default UserPermission;
