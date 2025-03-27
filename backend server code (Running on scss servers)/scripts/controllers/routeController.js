const routeService = require('../services/routeService');

class RouteController { 

    constructor() {
        console.log("Route Controller Created");
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
    async updateRouteInstance(req, res){
        const instanceId = Number(req.params.instanceId);
        const destinationNumber = Number(req.params.destinationNumber);

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
}

module.exports = new RouteController();