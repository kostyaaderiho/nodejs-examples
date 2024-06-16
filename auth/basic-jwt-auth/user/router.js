const { Router } = require('express');

const userController = require('./controller');

const router = new Router();

router.get('/', userController.get);

module.exports = router;
