const { User, Profile } = require('../models')
const { comparePassword } = require('../helper/bcryipt')
const { createToken } = require('../helper/jwt')
const { OAuth2Client } = require('google-auth-library');

class UserController {
  static async register (req, res, next) {
    const { 
      email, 
      password ,
      namaLengkap,
      alamat,
      rtRw,
      kelurahan,
      kecamatan,
      kotaKab,
      provinsi,
      lat,
      long
    } = req.body
    
    try {
      const user = await User.create({
        email, 
        password
      })

      const profile = await Profile.create({
        UserId: user.id,
        namaLengkap,
        alamat,
        rtRw,
        kelurahan,
        kecamatan,
        kotaKab,
        provinsi,
        lat,
        long,
        imageUrl: req.dataUpload.url
      })
    
      res.status(201).json({
        message: "Your profile is created",
        data: {
          id: profile.id,
          UserId: profile.UserId,
          namaLengkap: profile.namaLengkap,
          imageUrl: profile.imageUrl,
          alamat: profile.alamat,
          rtRw: profile.rtRw,
          kelurahan: profile.kelurahan,
          kecamatan: profile.kecamatan,
          kotaKab: profile.kotaKab,
          provinsi: profile.provinsi,
          lat: profile.lat,
          long: profile.long,
        }
      })
    } catch (error) {
      next(error)
    }
  }
  static async login (req, res, next) {
    const { email, password } = req.body

    try {
      if ( !email ) throw { name: "INVALID_EMAIL"}
      if ( !password ) throw { name: "INVALID_PASSWORD"}

      const data = await User.findOne({
        where: {
          email
        }
      })
      if ( !email ) throw { name: "INVALID" }
      
      const checkPass = comparePassword(password, data.password)
      if ( !checkPass ) throw { name: "INVALID" }

      const payload = {
        email: data.email,
        id: data.id
      }
      const access_token = createToken(payload)

      res.status(200).json({
        access_token
      })
    } catch (error) {
      next(error)
    }
  }
  static async postProfile (req, res, next) {
    try {
     
      
    } catch (error) {
      next(error)  
    }
  }
  static async getProfile (req, res, next) {
    try {
      const data = await Profile.findOne({
        where: {
          UserId: req.auth.id
        },
        include: {
          model: User,
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"]
          }
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"]
        }
      })

      res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }
  static async loginGoogle(req, res, next) {
    const { idToken, email } = req.body;
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID
    });
    const payload = ticket.getPayload();
    const password = payload['sub'];

    try {
      const userData = await User.findOrCreate({
        where: {
          email
        },
        defaults: {
          email,
          password
        }
      });

      const access_token = createToken({
        id: userData[0].id,
        email: payload['email'],
        username: payload['name']
      });

      res.status(200).json({
        access_token,
        id: userData[0].id,
        email: userData[0].email,
        role: userData[0].role,
        picture: payload['picture'],
        name: payload['name']
      })
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController