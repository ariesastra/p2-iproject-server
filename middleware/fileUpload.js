const { imageKit } = require('../apis/imageKit');
var formData = require('form-data')

const fileUpload = async (req, res, next) => {
  try {
    let response = {};

    if (req.file) {
      const imgBase64 = req.file.buffer.toString("base64");
      // Using form data
      let form = new formData();
      form.append('file', imgBase64);
      form.append('fileName', req.file.originalname);

      // Call Axios
      response = await imageKit.post('/files/upload', form, {
        headers: form.getHeaders(),//object content-type with boundary
      });

    }
    req.dataUpload = response.data ? response.data : '';

    next();
  } catch (error) {
    console.log(error, 'dari middleware fileUpload');
    next(error);
  }
}

module.exports = { fileUpload }