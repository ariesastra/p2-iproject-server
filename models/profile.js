'use strict';
const {
  Model
} = require('sequelize');

// const opencage = require('opencage-api-client');
const { opencageMap } = require('../helper/openCageMap')

module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.belongsTo(models.User)
    }
  };
  Profile.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: {
        msg: "You already have a profile"
      },
      validate: {
        notEmpty: {
          msg: "Please Follow with User ID"
        },
        notNull: {
          msg: "Please Follow with User ID"
        }
      }
    },
    namaLengkap: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    alamat: DataTypes.TEXT,
    rtRw: DataTypes.STRING,
    kelurahan: DataTypes.STRING,
    kecamatan: DataTypes.STRING,
    kotaKab: DataTypes.STRING,
    provinsi: DataTypes.STRING,
    lat: DataTypes.REAL,
    long: DataTypes.REAL
  }, {
    hooks: {
      // beforeCreate (instance, options) {       
      //   opencageMap(instance.alamat, (err, data) => {
      //     const latitude = data.geometry.lat
      //     const longitude = data.geometry.lng  
          
      //     console.log(data);
      //     // console.log(latitude, longitude);

      //     instance.lat = -6.1
      //     instance.long = longitude

      //     console.log(instance.lat, instance.long, '<<<<< dari instance');
      //   })
      // },
      afterCreate (instance, options) {
        opencageMap(instance.alamat).then(data => {
          const latitude = data.geometry.lat
          const longitude = data.geometry.lng  

          return Profile.update({
            lat: latitude, 
            long: longitude
          }, {
            where: {
              id: instance.id
            }
          }) 
        })
      }
    },
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};