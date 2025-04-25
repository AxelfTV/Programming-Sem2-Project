const routeService = require('../services/routeService');

class RouteController { 

    constructor() {
        console.log("Route Controller Created");
    }
    async getRoutes(req, res){
        const result = await routeService.getAllRoutes();
        if(result){
        res.send(JSON.stringify(result));
        }
        else{
            res.status(404).json({ message: "No Routes Found." });
        }
    }
    async getRouteById(req, res){
        const routeId = Number(req.params.routeId);
        const result = await routeService.getRouteById(routeId);
        if(result){
            res.send(JSON.stringify(result));
        }
        else{
            res.status(404).json({ message: "Route not found." });
        }
    }
    async getRandomRoutes(req, res){
        let limit = Number(req.query.limit);

        if (isNaN(limit) || limit <= 0) {
            limit = 5;
        }
        const result = await routeService.getRandomRoutes(limit);
        if(result){
            res.send(JSON.stringify(result));
        }
        else{
            res.status(404).json({ message: "Routes not found." });
        }
    }
    async getRouteLocations(req, res){
        const routeId = Number(req.params.routeId);
        const result = await routeService.getRouteLocationsByRouteId(routeId);
        if(result.length > 0){
            res.send(JSON.stringify(result));
        }
        else{
            res.status(404).json({ message: "Route locations not found." });
        }
    }
    async addNewRoute(req, res){
        const {userId, locations, name} = req.body;
        const result = await routeService.addNewRoute(userId, locations, name);
        if(result){
            res.send(JSON.stringify(result));
        }
        else{
            res.status(500).json({ message: "Internal server error." });
        }
    }
    async userStartRoute(req, res){
        const userId = Number(req.params.userId);
        const routeId = Number(req.params.routeId);

        if (isNaN(routeId) || isNaN(userId)) {
            return res.status(400).json({ message: "Invalid parameters" });
        }

        const checkCurrent = await routeService.checkUserRouteStatus(userId);
        console.log(checkCurrent);
        if(!checkCurrent){
            const result = await routeService.userStartRoute(userId, routeId);
            if(result) res.send(JSON.stringify(result));
            else res.status(500).json({ message: "Internal server error." });
        }
        else{
            res.status(409).json({ message: "User already has an active route." });
        }
    }
    async getUserActiveInstance(req, res){
        const userId = Number(req.params.userId);

        if (isNaN(userId)) {
            return res.status(400).json({ message: "Invalid userId parameter" });
        }

        const result = await routeService.getUserActiveInstance(userId);
        if(result.length > 0){
            res.send(JSON.stringify(result));
        }
        else{
            res.status(404).json({ message: "User has no active route." });
        }
    }
    async getInstanceById(req, res){
        const instanceId = Number(req.params.instanceId);

        if (isNaN(instanceId)) {
            return res.status(400).json({ message: "Invalid parameter" });
        }

        if (isNaN(instanceId)) {
            return res.status(400).json({ message: "Invalid instanceId parameter" });
        }

        const result = await routeService.getInstanceById(instanceId);
        if(result.length > 0){
            res.send(JSON.stringify(result));
        }
        else{
            res.status(404).json({ message: "Route instance not found." });
        }
    }
    async updateRouteInstance(req, res){
        const instanceId = Number(req.params.instanceId);
        const destinationNumber = Number(req.params.destinationNumber);

        if (isNaN(instanceId) || isNaN(destinationNumber)) {
            return res.status(400).json({ message: "Invalid parameters" });
        }

        const instance = await routeService.getInstanceById(instanceId);
        console.log(instance);
        if(instance.count===0){
            res.status(404).json({ message: "Route instance not found." });
        }
        else if(instance[0].status == -1){
            res.status(409).json({ message: "Route instance is inactive." });
        }
        else{
            const result = await routeService.updateRouteInstance(instanceId, destinationNumber);
            if (result) {
                res.json({ message: result });
            } 
            else {
                res.status(500).json({ message: "Internal server error." });
            } 
        }
    }
    async endRoute(req, res){
        const instanceId = Number(req.params.instanceId);
        const destinationNumber = -1
        
        if (isNaN(instanceId)) {
            return res.status(400).json({ message: "Invalid parameter" });
        }

        const instance = await routeService.getInstanceById(instanceId);
        console.log(instance);
        if(instance.length==0){
            res.status(404).json({ message: "Route instance not found." });
        }
        else if(instance[0].status == -1){
            res.status(409).json({ message: "Route instance is inactive." });
        }
        else{
            const result = await routeService.updateRouteInstance(instanceId, destinationNumber);
            if (result) {
                res.json({ message: result });
            } 
            else {
                res.status(500).json({ message: "Internal server error." });
            } 
        }
    }
    async getRouteRating(req, res)
    {
        const routeId = Number(req.params.routeId);
        if(isNaN(routeId)){
            return res.status(400).json({ message: "Invalid parameter" });
        }
        const ratings = await routeService.getRouteRatings(routeId);
        if(ratings.length <= 0){
            return res.status(404).json({ message: "Route ratings not found." });
        }
        let sum = 0;
        for(let i = 0;i < ratings.length; i++){
            sum += ratings[i].score;
        }
        res.send(JSON.stringify(sum));
    }
    async getRouteImage(req, res){
        const routeId = Number(req.params.routeId);
        if(isNaN(routeId)){
            return res.status(400).json({ message: "Invalid parameter" });
        }
        const locations = await routeService.getRouteLocationsByRouteId(routeId);
        if(locations.length <= 0){
            return res.status(404).json({ message: "Route locations not found." });
        }
        res.send(JSON.stringify(locations[0].image_src));
    }
}

module.exports = new RouteController();