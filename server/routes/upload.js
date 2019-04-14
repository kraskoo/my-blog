const express = require('express');
const router = new express.Router();
const formidable = require('formidable');
const uidk = require('uidk');
const path = require('path');
const fs = require('fs');
const User = require('../models/User');
const imagesPath = 'static/images';
const avatarsPath = 'static/avatars';
const imagesContentPath = path.normalize(path.join(__dirname, '/../', imagesPath));
const avatarsContentPath = path.normalize(path.join(__dirname, '/../', avatarsPath));

router.post('/images', (req, res) => {
  const form = new formidable.IncomingForm();
  let newFilePath = '';
  form.on('fileBegin', (_name, file) => {
    const nameAndExtension = file.name.split('.');
    file.name = `${uidk()}.${nameAndExtension[1]}`;
    file.path = path.normalize(imagesContentPath + '/' + file.name);
    fileName = file.name;
    newFilePath = 'http://localhost:65535/' + imagesPath + '/' + file.name;
  }).on('end', () => {
    return res.status(200).json({
      success: true,
      message: "Image upload successfully!",
      imageUrl: newFilePath
    });
  }).parse(req);
});

router.post('/changeProfilePicture', (req, res) => {
  let { file, fileName, userId } = req.body;
  file = file.replace(/^data:image\/(?:jpg|gif|png|jpeg|tif|tiff);base64,/, '');
  const nameAndExtension = fileName.split('.');
  const newFileName = `${uidk()}.${nameAndExtension[1]}`;
  const filePath = path.normalize(path.join(avatarsContentPath, '/', newFileName));
  const urlPath = 'http://localhost:65535/' + avatarsPath + '/' + newFileName;
  fs.writeFile(filePath, file, 'base64', function (err) {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message
      });
    }

    User.findById(userId).then(user => {
      if (!user.profilePicture.endsWith('defaultProfilePicture.png')) {
        let old = user.profilePicture.split('/');
        old = old[old.length - 1];
        let oldPath = user.profilePicture.replace('http://localhost:65535/' + avatarsPath + '/' + old, avatarsContentPath + '/' + old);
        oldPath = path.normalize(oldPath);
        fs.unlink(oldPath, err => {
          if (err) {
            console.log(err);
          }

          user.profilePicture = urlPath;
          user.save().then(() => {
            return res.status(200).json({
              success: true,
              message: 'Successfully changed profile picture!',
              image: urlPath
            });
          }).catch(err => {
            return res.status(400).json({
              success: false,
              message: err.message
            });
          });
        });
      } else {
        user.profilePicture = urlPath;
        user.save().then(() => {
          return res.status(200).json({
            success: true,
            message: 'Successfully changed profile picture!',
            image: urlPath
          });
        }).catch(err => {
          return res.status(400).json({
            success: false,
            message: err.message
          });
        });
      }
    }).catch(err => {
      return res.status(400).json({
        success: false,
        message: err.message
      });
    });
  });
});

module.exports = router;