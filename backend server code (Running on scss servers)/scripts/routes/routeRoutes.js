const express = require('express');
const routeController = require('../controllers/routeController');

const router = express.Router();

router.get('/:routeId', routeController.getRouteById);

router.get('/selection/random', routeController.getRandomRoutes);

router.get('/:routeId/locations', routeController.getRouteLocations);

router.post('/', routeController.addNewRoute);

router.post('/:routeId/start/user/:userId/', routeController.userStartRoute);

router.put('/update/instance/:instanceId/position/:destinationNumber', routeController.updateRouteInstance);

router.put('/end/instance/:instanceId', routeController.endRoute);

module.exports = router;