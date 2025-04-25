const express = require('express');
const routeController = require('../controllers/routeController');

const router = express.Router();

router.get('/', routeController.getRoutes)

router.get('/:routeId', routeController.getRouteById);

router.get('/selection/random', routeController.getRandomRoutes);

router.get('/:routeId/locations', routeController.getRouteLocations);

router.post('/', routeController.addNewRoute);

router.post('/:routeId/start/user/:userId/', routeController.userStartRoute);

router.put('/update/instance/:instanceId/position/:destinationNumber', routeController.updateRouteInstance);

router.put('/instance/:instanceId/end', routeController.endRoute);

router.get('/user/:userId/instance', routeController.getUserActiveInstance);

router.get('/instance/:instanceId', routeController.getInstanceById);

router.get('/:routeId/rating', routeController.getRouteRating);

router.get('/:routeId/image', routeController.getRouteImage);

module.exports = router;