import { Model } from 'sequelize'

export default (sequelize, DataTypes) => {
  class Partner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      Partner.belongsTo(models.CompanyType)
      Partner.belongsTo(models.Settlement)
    }
  };
  Partner.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    companyTypeId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'CompanyTypes',
        key: 'id'
      }
    },
    taxNumber: {
      type: DataTypes.STRING
      // is: /^(\d{7})(\d)-([1-5])-(0[2-9]|[13][0-9]|2[02-9]|4[0-4]|51)$/
    },
    companyRegistrationNumber: {
      type: DataTypes.STRING
      // is: /^(\d{2})-(\d{2})-(\d{6})$/
    },
    settlementId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Settlements',
        key: 'id'
      }
    },
    address: DataTypes.STRING,
    phone: {
      type: DataTypes.STRING
      // is: /^[+\d]?(?:[\d-.\s()]*)$/i
    },
    bankAccount: {
      type: DataTypes.STRING
      // is: /^[0-9]{8}([ -]?[0-9]{8}){1,2}$/
    },
    comment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Partner'
  })
  return Partner
}
