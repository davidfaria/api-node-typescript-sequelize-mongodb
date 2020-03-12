import { Model, DataTypes, Sequelize } from 'sequelize';
import { uuid } from '@helpers/hash';

class Role extends Model {
  public id!: string;

  public slug!: string;

  public name!: string;

  public description!: string;

  // timestamps!
  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;

  static initialize(sequelize: Sequelize) {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        slug: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
      },
      {
        tableName: 'roles',
        sequelize,
      },
    );

    return this;
  }

  static associate(models: any) {
    this.belongsToMany(models.Permission, {
      foreignKey: 'role_id',
      through: 'role_permissions',
      otherKey: 'permission_id',
      as: 'permissions',
    });
  }
}

export default Role;
