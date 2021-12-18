'use strict';
const {
  Model
} = require('sequelize');

const { hashPassword } = require('../helper/bcryipt')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Profile, { foreignKey: "UserId" })
      User.hasMany(models.Post)
      User.hasMany(models.Organization)
      User.hasMany(models.PaymentStatus)
      User.hasMany(models.Comment)
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Email must be unique"
      },
      validate: {
        isEmail: {
          msg: "Invalid email format"
        },
        notNull: {
          msg: "Email is required"
        },
        notEmpty: {
          msg: "Email is required"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Password is required"
        },
        notEmpty: {
          msg: "Password is required"
        }
      }
    }
  }, {
    hooks: {
      beforeCreate (instance, options) {
        instance.password = hashPassword(instance.password)
      }
    },  
    sequelize,
    modelName: 'User',
  });
  return User;
};