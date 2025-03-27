const express = require('express');
const imageController = require('../controllers/imageController');

const path = require('path');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      let uploadPath = 'uploads/';
      if(req.query.type === 'profile'){
        uploadPath += 'profile-images/'
      }
      else if(req.query.type === 'instance'){
        uploadPath == 'instance-images/'
      }
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({storage:storage});

const router = express.Router();

router.post('/', upload.single('image'), imageController.uploadImage);

router.put('/user/:userId/profile', upload.single('image'), imageController.updateUserProfile);

router.post('instance/:instanceId/location/:locationId', upload.single('image'), imageController.uploadInstanceImage);

module.exports = router;