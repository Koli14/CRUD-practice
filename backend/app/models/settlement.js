import { Model } from 'sequelize'

export default (sequelize, DataTypes) => {
  class Settlement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      Settlement.hasMany(models.Partner)
    }
  };
  Settlement.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Settlement'
  })
  return Settlement
}
