const userService = require('../services/userService');
const routeService = require('../services/routeService');
const imageService = require('../services/imageService');

class ImageController { 
    constructor() {
        console.log("Content Controller Created");
    }
    async uploadImage(req, res){
        console.log("Trying to upload image");
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }
        const imagePath = req.file.path;
        console.log("Image uploaded to:", imagePath);

        return res.status(200).json({ message: "Upload successful", path: imagePath });
    }
    async updateUserProfile(req, res){
        const userId = Number(req.params.userId);
        const user = await userService.getUserById(userId);
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
    }
    async uploadInstanceImage(req, res){
        const instanceId = Number(req.params.instanceId);
        const locationId = Number(req.params.locationId);

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
    }
    async updateLocationImage(req, res){
        const locationId = Number(req.params.locationId);
        const location = await routeService.getLocationById(locationId);
        if(location.length === 0){
            return res.status(404).send('Location not found.');
        }
        if(isNaN(locationId)){
            return res.status(400).send('Not a valid location ID.');
        }
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }
        const imagePath = req.file.path;
        const result = await imageService.updateLocationImage(locationId, imagePath)
        if(result){
            return res.status(200).json({ message: "Location image updated.", path: imagePath });
        }
        else{
            res.status(500).json({ message: "Internal Server Error." });
        }
    }
}

module.exports = new ImageController();