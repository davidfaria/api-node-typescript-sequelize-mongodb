import { Model, DataTypes, BelongsTo, Sequelize } from 'sequelize';
import { uuid, generateBcryptHash } from '@helpers/hash';
import File from '@models/File';

class User extends Model {
  public id!: string;
  public name!: string;
  public email!: string;
  public password!: string;
  public status?: string;
  public forget?: string | null;
  public avatar_id?: string;

  // timestamps!
  public confirmedAt?: Date | null;
  public forgetAt?: Date | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associations: {
    avatar: BelongsTo<User, File>;
  };

  static initialize(sequelize: Sequelize) {
    this.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          allowNull: false,
          defaultValue: uuid(),
        },
        avatar_id: {
          type: DataTypes.UUID,
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
  }
}

// User.sync({ force: false }).then(() => console.log('User table created'));

export default User;
