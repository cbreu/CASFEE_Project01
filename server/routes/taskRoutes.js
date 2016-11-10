var express = require('express');
var router = express.Router();
var orders = require('../controller/tasksController.js');

router.get("/tasks/:id/", orders.getOne);
router.get("/tasks/", orders.getAll);
router.post("/tasks/", orders.add);
router.put("/tasks/:id/", orders.update);
router.delete("/tasks/:id/", orders.remove);
router.delete("/tasks/:id/:new", orders.removeNew);

module.exports = router;