const express = require('express');
const contentController = require('../controllers/contentController');

const router = express.Router();

router.get('/', async (req, res) => {
    res.send("Content here");
});
router.get('/user/:userId/posts', contentController.getUserPosts);

router.post('/user/:userId/create/:instanceId', contentController.createPost);

router.get('/user/:userId/feed', contentController.getUserFeed);

router.get('/instance/:instanceId/images', contentController.getPostImages);

router.post('/rate/user/:userId/route/:routeId/rating/:score', contentController.createRating);

module.exports = router;