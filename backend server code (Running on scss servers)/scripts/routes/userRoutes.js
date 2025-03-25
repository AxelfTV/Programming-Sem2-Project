const express = require('express');
const UserService = require('../services/userService');
const pool = require('../../db');

const router = express.Router();
const userService = new UserService(pool);

router.get('/', async (req, res) => {
    const result = await userService.getAllUsers();
    if(result){
      res.send(JSON.stringify(result));
    }
    else{
      res.status(404).json({ message: "No Users Found." });
    }
  });

router.get('/:userId', async (req, res) => {
    const userId = Number(req.params.userId);
    const result = await userService.getUserById(userId);
    if(result){
      res.send(JSON.stringify(result));
    }
    else{
      res.status(404).json({ message: "User Not Found." });
    }
  });

router.put('/bio/:userId', async (req, res) => {
    const userId = Number(req.params.userId);
    const {bio} = req.body;
    const result = await userService.updateUserBio(userId, bio);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User profile not found." });
    }
    else{
      res.json({ message: "Bio updated successfully." });
    }
  });

router.put('/image/:userId', async (req, res) => {
    const userId = Number(req.params.userId);
    const {image_src} = req.body;
    //need to check if valid img url
    const result = await userService.updateUserProfileImage(userId, image_src);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User profile not found." });
    }
    else{
      res.json({ message: "Profile image updated successfully." });
    }
  });

router.post('/', async (req, res) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required." });
    }
    const existingUser = await userService.checkUserExists(username);
    if(existingUser[0].username_exists){
      return res.status(409).json({ message: "User already exists." });
    }
    const result = await userService.addNewUser(username, password);
    if(result){
      res.send(JSON.stringify(result));
    }
    else{
      res.status(500).json({ message: "Internal server error." });
    }
  });

  router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required." });
    }

    const loginResult = await userService.loginUser(username, password);

    if (!loginResult.success) {
      return res.status(401).json({ message: loginResult.message });
    }

    res.json({ message: 'Login successful.', user: loginResult.user });
  });
router.post('/follow/:followedUserId/:followerUserId', async (req, res) => {
    const followedId = Number(req.params.followedUserId);
    const followerId = Number(req.params.followerUserId);
    const result = await userService.addNewFollow(followedId, followerId);
    if(result){
      res.send(JSON.stringify(result));
    }
    else{
      res.status(500).json({ message: "Could not add follower." });
    }
   });

  module.exports = router;