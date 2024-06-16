const { Router } = require('express');

const userController = require('./userController');

const router = new Router();

router.get('/', userController.get);

module.exports = router;
