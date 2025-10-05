const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/userController.js');

router.route('/').get(userControllers.getAllUsers)

module.exports = router;



module.exports = router;