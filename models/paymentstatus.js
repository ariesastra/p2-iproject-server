'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PaymentStatus extends Model {
    static associate(models) {
      PaymentStatus.belongsTo(models.User)
      PaymentStatus.belongsTo(models.Organization)
    }
  };
  PaymentStatus.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please Follow with User ID"
        },
        notEmpty: {
          msg: "Please Follow with User ID"
        }
      }
    },
    OrganizationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please Follow with Organization ID"
        },
        notEmpty: {
          msg: "Please Follow with Organization ID"
        }
      }
    },
    status: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate (instance, options) {
        instance.status = 'pending'
      }
    },
    sequelize,
    modelName: 'PaymentStatus',
  });
  return PaymentStatus;
};