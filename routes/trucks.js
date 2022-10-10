var express = require('express');
var router = express.Router();

/* Load controller */
const TruckController = require('../controller/truckController');
const truckController = new TruckController();

router.get('/', function (req, res) {
  truckController.findAll(res);
});

router.put('/:id', function (req, res) {
  truckController.update(req, res);
});

router.post('/create', function (req, res) {
  truckController.create(req, res);
});

module.exports = router;
