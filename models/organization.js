'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Organization extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Organization.belongsTo(models.User, { foreignKey: "UserId" })
    }
  };
  Organization.init({
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
    name: {
      type: DataTypes.STRING,
      allowNull: false, 
      validate: {
        notNull: {
          msg: "Tolong masukkan nama organisasi"
        },
        notEmpty: {
          msg: "Tolong masukkan nama organisasi"
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false, 
      validate: {
        notNull: {
          msg: "Tolong masukkan deskripsi dari organisasi"
        },
        notEmpty: {
          msg: "Tolong masukkan deskripsi dari organisasi"
        }
      }
    },
    isPaid: {
      type: DataTypes.BOOLEAN,
      allowNull: false, 
      validate: {
        notNull: {
          msg: "Tolong tentukan status berbayar"
        },
        notEmpty: {
          msg: "Tolong tentukan status berbayar"
        }
      }
    },
    price: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate(instance, options) {
        instance.isPaid = instance.isPaid ? instance.isPaid : false
      }
    },
    sequelize,
    modelName: 'Organization',
  });
  return Organization;
};