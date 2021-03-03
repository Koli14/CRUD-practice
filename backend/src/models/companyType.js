import { Model } from 'sequelize'

export default (sequelize, DataTypes) => {
  class CompanyType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      CompanyType.hasMany(models.Partner)
    }
  };
  CompanyType.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'CompanyType'
  })
  return CompanyType
}
