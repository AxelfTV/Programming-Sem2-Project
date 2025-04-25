const contentService = require('../services/contentService');
 const contentService = require('../services/contentService');
const routeService = require('../services/routeService');

class ContentController { 
    constructor() {
        console.log("Content Controller Created");
    }
    async getUserPosts(req, res){
        const userId = Number(req.params.userId);
        let limit = Number(req.query.limit);

        if (isNaN(limit) || limit <= 0) {
            limit = 5;
        }
        const result = await contentService.getUserPosts(userId, limit);
        if(result){
            res.send(JSON.stringify(result));
        }
        else{
            res.status(500).json({ message: "Internal server error." });
        }
    }
    async createPost(req, res){
        const userId = Number(req.params.userId);
        const instanceId = Number(req.params.instanceId);

        const instance = await routeService.getInstanceById(instanceId);
        const existingPost = await contentService.checkPostExists(instanceId);
        console.log(existingPost);
        if(existingPost){
            return res.status(409).json({ message: "Post already exists." });
        }
        else if(instance.length===0){
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
    }
    async getUserFeed(req, res){
        const userId = Number(req.params.userId);
        let limit = Number(req.query.limit);

        if (isNaN(limit) || limit <= 0) {
            limit = 5;
        }
        const result = await contentService.getUserFeed(userId,limit);
        if(result){
            res.send(JSON.stringify(result));
        }
        else{
            res.status(500).json({ message: "Internal server error." });
        }
    }
    async getPostImages(req, res){
        const instanceId = Number(req.params.instanceId);
        const checkExists = await contentService.checkPostExists(instanceId);
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
    }
    async createRating(req, res){
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
    }
}

module.exports = new ContentController();