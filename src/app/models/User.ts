import {
  Model,
  DataTypes,
  BelongsTo,
  Sequelize,
  BelongsToMany,
  HasManyGetAssociationsMixin,
} from 'sequelize';
import { generateBcryptHash } from '@helpers/hash';
import File from '@models/File';
import Role from '@models/Role';
import Store from '@models/Store';
import Permission from '@models/Permission';

class User extends Model {
  public id!: string;
  public name!: string;
  public email!: string;
  public password!: string;
  public status?: string;
  public forget?: string | null;
  public avatar_id?: string;
  public avatar?: File;
  public roles?: Role[];
  public permissions?: Permission[];
  public stores?: Store[];

  // timestamps!
  public confirmedAt?: Date | null;
  public forgetAt?: Date | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associations: {
    avatar: BelongsTo<User, File>;
    roles: BelongsToMany<User, Role>;
    permissions: BelongsToMany<User, Permission>;
    stores: BelongsToMany<User, Store>;
  };

  public getRoles!: HasManyGetAssociationsMixin<Role>;

  static initialize(sequelize: Sequelize) {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        avatar_id: {
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
        email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        status: {
          type: DataTypes.ENUM('registred', 'confirmed', 'canceled'),
          allowNull: false,
          defaultValue: 'registred',
        },
        forget: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        forgetAt: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        confirmedAt: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      {
        tableName: 'users',
        sequelize,
      },
    );

    this.addHook('beforeSave', async (user: User) => {
      if (user.password) {
        user.password = await generateBcryptHash(user.password, 8);
      }
    });

    return this;
  }

  static associate(models: any) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });

    this.belongsToMany(models.Store, {
      foreignKey: 'user_id',
      otherKey: 'store_id',
      through: 'user_stores',
      as: 'stores',
    });

    this.belongsToMany(models.Role, {
      foreignKey: 'user_id',
      otherKey: 'role_id',
      through: 'user_roles',
      as: 'roles',
    });

    this.belongsToMany(models.Permission, {
      foreignKey: 'user_id',
      otherKey: 'permission_id',
      through: 'user_permissions',
      as: 'permissions',
    });
  }
}

// User.sync({ force: false }).then(() => console.log('User table created'));

export default User;
