import { Sequelize, DataTypes, Model } from 'sequelize';

class Examples extends Model {
  public id!: number;
  public exampleText!: string;
  public createdBy!: number;
  public updatedBy!: number;
}

export default (sequelize: Sequelize) => {
  Examples.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      exampleText: {
        type: DataTypes.STRING,
        defaultValue: 'No text was provided.',
      },
      createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      updatedBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: 'examples',
      sequelize,
    },
  );

  return Examples;
};
