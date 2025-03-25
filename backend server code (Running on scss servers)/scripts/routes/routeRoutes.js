const express = require('express');
const RouteService = require('../services/routeService');
const pool = require('../../db');

const router = express.Router();
const routeService = new RouteService(pool);

router.get('/:routeId', async (req, res) => {
    const routeId = Number(req.params.routeId);
    const result = await routeService.getRouteById(routeId);
    if(result){
      res.send(JSON.stringify(result));
    }
    else{
      res.status(404).json({ message: "Route not found." });
    }
  });
  router.get('/selection/random', async (req, res) => {
    const limit = Number(req.query.limit);

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
  });
  router.get('/:routeId/locations', async (req, res) => {
    const routeId = Number(req.params.routeId);
    const result = await routeService.getRouteLocationsByRouteId(routeId);
    if(result.count > 0){
      res.send(JSON.stringify(result));
    }
    else{
      res.status(404).json({ message: "Route locations not found." });
    }
  })
  router.post('/', async (req, res) => {
    const {userId, locations, name} = req.body;
    const result = await routeService.addNewRoute(userId, locations, name);
    if(result){
      res.send(JSON.stringify(result));
    }
    else{
      res.status(500).json({ message: "Internal server error." });
    }
  })
  router.post('/start/:userId/:routeId', async (req, res) => {
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
  });
  router.put('/update/:instanceId/:destinationNumber', async (req, res) => {
    const instanceId = Number(req.params.instanceId);
    const destinationNumber = Number(req.params.destinationNumber);
    const image_src = '';

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
  });
  router.put('/end/:instanceId', async (req, res) => {
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
  });

module.exports = router;