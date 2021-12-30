const { User, Profile } = require('../models')
const { comparePassword } = require('../helper/bcryipt')
const { createToken } = require('../helper/jwt')
const { OAuth2Client } = require('google-auth-library');

class UserController {
  static async register (req, res, next) {
    const { 
      email, 
      password ,
    } = req.body
    
    try {
      const user = await User.create({
        email, 
        password
      })
    
      res.status(201).json({
        message: "Your profile is created",
        data: {
          id: user.id,
          UserId: user.UserId,
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
    const {
      namaLengkap,
      alamat, 
      rtRw,
      kelurahan,
      kecamatan,
      kotaKab,
      provinsi
    } = req.body
    const { id: UserId } = req.auth

    try {
     const data = await Profile.create({
      UserId,
      namaLengkap,
      imageUrl: req.dataUpload.url,
      alamat, 
      rtRw,
      kelurahan,
      kecamatan,
      kotaKab,
      provinsi
     })

     const result = {
       "nama-lengkap": data.namaLengkap,
       imageUrl: data.imageUrl,
       alamat: data.alamat,
       "rt/rw": data.rtRw,
       kelurahan: data.kelurahan,
       kecamatan: data.kecamatan,
       "kota-kab": data.kotaKab,
       provinsi: data.provinsi,
       latitude: data.lat,
       longitude: data.long
     }
      
     res.status(200).json({
       message: "Your Profile already updated !",
       data: result
     })
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