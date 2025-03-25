const express = require('express');
const ContentService = require('../services/contentService');
const RouteService = require('../services/routeService');
const pool = require('../../db');

const router = express.Router();
const contentService = new ContentService(pool);
const routeService = new RouteService(pool);

router.get('/', async (req, res) => {
    
    res.send("Content here");
    
});
router.get('/:userId/posts', async (req, res) => {
    const userId = Number(req.params.userId);
    const limit = Number(req.query.limit);
    const result = await contentService.getUserPosts(userId, limit);
    if(result){
        res.send(JSON.stringify(result));
    }
    else{
        res.status(500).json({ message: "Internal server error." });
    }
});
router.post('/:userId/create/:instanceId', async (req, res) => {
    const userId = Number(req.params.userId);
    const instanceId = Number(req.params.instanceId);

    const instance = await routeService.getInstanceById(instanceId);
    const existingPost = await contentService.checkPostExists(instanceId);
    console.log(existingPost);
    if(existingPost){
        return res.status(409).json({ message: "Post already exists." });
    }
    else if(instance.count===0){
        res.status(404).json({ message: "Route instance not found." });
    }
    else if(instance[0].status != -1){
        return res.status(409).json({ message: "Route instance is still active." });
    }
    else{
        const result = await contentService.createPost(userId, instanceId);
        if(result){
            return res.send(JSON.stringify(result));
        }
        else{
            return res.status(500).json({ message: "Internal server error." });
        }
    }
});
router.get('/:userId/feed', async (req, res) => {
    const userId = Number(req.params.userId);
    const limit = Number(req.query.limit);
    const result = await contentService.getUserFeed(userId,limit);
    if(result){
        res.send(JSON.stringify(result));
    }
    else{
        res.status(500).json({ message: "Internal server error." });
    }
});
router.get('/:instanceId/images', async (req, res) => {
    const instanceId = Number(req.params.instanceId);
    let checkExists = await contentService.checkPostExists(instanceId);
    if(!checkExists){
        res.status(404).json({ message: "No post created for this instance." });
    }
    else{
        const result = await contentService.getPostImages(instanceId);
        if(result){
            res.send(JSON.stringify(result));
        }
        else{
            res.status(500).json({ message: "Internal server error." });
        }
    }
});
router.post('/rate/:userId/:routeId/:score', async (req, res) => {
    const userId = Number(req.params.userId);
    const routeId = Number(req.params.routeId);
    const score = Number(req.params.score);

    const result = await contentService.createRating(userId, routeId, score);
    if(result){
        res.send(JSON.stringify(result));
    }
    else{
        res.status(500).json({ message: "Internal server error." });
    }
});

module.exports = router;