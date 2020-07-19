module.exports = (sequelize, Sequelize) => {
  const Examples = sequelize.define('examples', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    exampleText: {
      type: Sequelize.STRING,
      defaultValue: 'No text was provided.',
    },
    createdBy: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    updatedBy: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });

  return Examples;
};
