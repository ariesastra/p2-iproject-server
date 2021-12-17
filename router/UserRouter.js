const user = require('express').Router()
// MIDDLEWARE
const authentication = require('../middleware/authentication')
const { instanceMulter } = require('../middleware/multer')
const { fileUpload } = require('../middleware/fileUpload')
// CONTROLLER
const UserController = require('../controller/UserController')

user.post('/register', 
  instanceMulter.single('profileImg'),
  fileUpload,
  UserController.register
)
user.post('/login', UserController.login)
user.post('/google-oauth', UserController.loginGoogle)

// user.post('/profile', 
//   instanceMulter.single('profileImg'),
//   fileUpload,
//   UserController.postProfile
// )

user.get('/profile',
  authentication,
  UserController.getProfile
)

user.put('/profile/:id')

module.exports = user