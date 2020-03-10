import { Model, DataTypes, Sequelize } from 'sequelize';
import { uuid } from '@helpers/hash';

class File extends Model {
  public id!: string;
  public name!: string;
  public path!: string;
  public url!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static initialize(sequelize: Sequelize) {
    this.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          allowNull: false,
          defaultValue: uuid(),
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        path: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        url: {
          type: DataTypes.VIRTUAL,
          get() {
            return `${process.env.APP_URL_FILE}/files/${this.path}`;
          },
        },
      },
      {
        tableName: 'files',
        sequelize,
      },
    );

    return this;
  }
}

export default File;
