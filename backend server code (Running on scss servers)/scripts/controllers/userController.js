const userService = require('../services/userService');

class UserController { 

    constructor() {
        console.log("User Controller Created");
    }
    async getUsers(req, res){
        const result = await userService.getAllUsers();
        if(result){
        res.send(JSON.stringify(result));
        }
        else{
            res.status(404).json({ message: "No Users Found." });
        }
    }
    async getUserById(req, res){
        const userId = Number(req.params.userId);
        const result = await userService.getUserById(userId);
        if(result){
            res.send(JSON.stringify(result));
        }
        else{
            res.status(404).json({ message: "User Not Found." });
        }
    }
    async updateUserBio(req, res){
        const userId = Number(req.params.userId);
        const {bio} = req.body;
        const result = await userService.updateUserBio(userId, bio);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "User profile not found." });
        }
        else{
            res.json({ message: "Bio updated successfully." });
        }
    }
    async addNewUser(req, res){
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
    }
    async loginUser(req, res){
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: "Username and password are required." });
        }

        const loginResult = await userService.loginUser(username, password);

        if (!loginResult.success) {
            return res.status(401).json({ message: loginResult.message });
        }

        res.json({ message: 'Login successful.', user: loginResult.user });
    }
    async newFollow(req, res){
        const followedId = Number(req.params.followedUserId);
        const followerId = Number(req.params.followerUserId);
        const result = await userService.addNewFollow(followedId, followerId);
        if(result){
            res.send(JSON.stringify(result));
        }
        else{
            res.status(500).json({ message: "Could not add follower." });
        }
    }
    async getUserFollowing(req, res){
        const userId = Number(req.params.userId);
        const result = await userService.getUserFollowing(userId);
        if(result){
            res.send(JSON.stringify(result));
        }
        else{
            res.status(500).json({ message: "Internal Server Error." });
        }
    }
    async getUserFollowers(req, res){
        const userId = Number(req.params.userId);
        const result = await userService.getUserFollowers(userId);
        if(result){
            res.send(JSON.stringify(result));
        }
        else{
            res.status(500).json({ message: "Internal Server Error." });
        }
    }
    async getRandomUsers(req, res){
        let limit = Number(req.query.limit);

        if (isNaN(limit) || limit <= 0) {
            limit = 5;
        }
        const result = await userService.getRandomUsers(limit);
        if(result){
            res.send(JSON.stringify(result));
        }
        else{
            res.status(404).json({ message: "Users not found." });
        }
    }
}

module.exports = new UserController();