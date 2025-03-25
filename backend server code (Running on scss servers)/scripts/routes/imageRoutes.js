const express = require('express');
const UserService = require('../services/userService');
const RouteService = require('../services/routeService');
const ImageService = require('../services/imageService')
const pool = require('../../db');

const userService = new UserService(pool);
const routeService = new RouteService(pool);
const imageService = new ImageService(pool);

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

router.post('/test', upload.single('image'), async (req, res) => {
  console.log("Trying to upload image");
  if (!req.file) {
      return res.status(400).send('No file uploaded.');
  }
  const imagePath = req.file.path;
  console.log("Image uploaded to:", imagePath);

  return res.status(200).json({ message: "Upload successful", path: imagePath });
});
router.put('user/:userId/profile', upload.single('image'), async (req, res) => {
  const userId = Number(req.params.userId);
  const user = userService.getUserById(userId);
  if(user.length === 0){
    return res.status(404).send('User not found.');
  }
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  const imagePath = req.file.path;
  const result = await userService.updateUserProfileImage(userId, imagePath)
  if(result){
    return res.status(200).json({ message: "Profile image updated.", path: imagePath });
  }
  else{
    res.status(500).json({ message: "Internal Server Error." });
  }
});
router.post('instance/:instanceId/location/:locationId', async (req, res) => {
  const instanceId = Number(req.params.instanceId);
  const locationId = Number(req.params.locationNo);

  const instance = await routeService.getInstanceById(instanceId);
  if(instance.count===0){
    res.status(404).json({ message: "Route instance not found." });
  }
  const imagePath = req.file.path;
  const result = await imageService.createInstanceImage(instanceId, locationId, imagePath);
  if(result){
    return res.status(200).json({ message: "Instance image uploaded.", path: imagePath });
  }
  else{
    res.status(500).json({ message: "Internal Server Error." });
  }
});

module.exports = router;