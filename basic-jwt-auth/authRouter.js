const { Router } = require('express');

const authController = require('./authController');

const router = new Router();

router.post('/registration', authController.registration);
router.post('/login', authController.login);

module.exports = router;
