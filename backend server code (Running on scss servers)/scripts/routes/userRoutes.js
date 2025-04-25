const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/', userController.getUsers);

router.get('/:userId', userController.getUserById);

router.put('/:userId/bio', userController.updateUserBio);

router.post('/', userController.addNewUser);

router.post('/login', userController.loginUser);

router.post('/:followerUserId/follow/:followedUserId', userController.newFollow);

router.get('/:userId/following', userController.getUserFollowing);

router.get('/:userId/followers', userController.getUserFollowers);

router.get('/selection/random', userController.getRandomUsers);

module.exports = router;