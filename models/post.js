'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User, { foreignKey: "UserId" })
      Post.hasMany(models.Comment)
    }
  };
  Post.init({
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
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Minimal masukkan deskripsi untuk post"
        },
        notEmpty: {
          msg: "Minimal masukkan deskripsi untuk post"
        }
      }
    },
    imageUrl: DataTypes.STRING,
    tag: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate (instance, options) {
        instance.status = instance.status ? instance.status : 'active'
      }
    },
    sequelize,
    modelName: 'Post',
  });
  return Post;
};