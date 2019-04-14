const express = require('express');
const router = new express.Router();
const path = require('path');
const fs = require('fs');
const staticPath = path.normalize(path.join(__dirname, '../static'));

router.get('/images/:file', (req, res) => {
  const { file } = req.params;
  const pathToFile = path.normalize(path.join(staticPath + '/images/' + file));
  if (fs.existsSync(pathToFile)) {
    const fileAndExtension = file.split('.');
    const extension = fileAndExtension[1].toLowerCase();
    fs.readFile(pathToFile, (err, data) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: err.message
        });
      }

      res.set({ 'Content-Type': `image/${extension}` });
      return res.end(data);
    });
  } else {
    return res.status(404).json({
      success: false,
      message: 'File not found!'
    });
  }
});

router.get('/avatars/:file', (req, res) => {
  const { file } = req.params;
  const pathToFile = path.normalize(path.join(staticPath + '/avatars/' + file));
  if (fs.existsSync(pathToFile)) {
    const fileAndExtension = file.split('.');
    const extension = fileAndExtension[1].toLowerCase();
    fs.readFile(pathToFile, (err, data) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: err.message
        });
      }

      res.set({ 'Content-Type': `image/${extension}` });
      return res.end(data);
    });
  } else {
    return res.status(404).json({
      success: false,
      message: 'File not found!'
    });
  }
});

module.exports = router;