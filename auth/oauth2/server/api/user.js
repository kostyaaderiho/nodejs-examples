const express = require('express');

const { isUserAuthenticated } = require('../middlewares/auth');

const router = express.Router();

router.get('/users', isUserAuthenticated, (req, res) => {
    res.json(req.user);
});

module.exports = router;
