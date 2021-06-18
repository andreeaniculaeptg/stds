'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class drug extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  drug.init({
    name: DataTypes.STRING,
    why: DataTypes.TEXT,
    how: DataTypes.TEXT,
    url: DataTypes.STRING,
    description: DataTypes.STRING,
    hiv: DataTypes.TEXT,
    hivurl: DataTypes.STRING,
    lactation: DataTypes.TEXT,
    lactationurl: DataTypes.STRING,
    liver: DataTypes.TEXT,
    liverurl: DataTypes.STRING,
    packager: DataTypes.TEXT,
    packagerurl: DataTypes.STRING,
    category: DataTypes.STRING,
    categorydrugurl: DataTypes.STRING,
    categorydrugdesc: DataTypes.TEXT,
    clinicalstudiesurl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'drug',
  });
  return drug;
};