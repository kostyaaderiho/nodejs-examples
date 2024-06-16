const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get(
    '/login/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
    '/login/google/callback',
    passport.authenticate('google', {
        failureMessage: 'Cannot login to Google, please try again later!',
        failureRedirect: process.env.GOOGLE_LOGIN_ERROR_URL,
        successRedirect: process.env.GOOGLE_LOGIN_SUCCESS_URL
    })
);

router.get('/logout', (req, res, next) => {
    req.session.destroy((err) => {
        if (err) {
            res.status(400).send('Unable to log out');
        } else {
            res.send('Logout successful');
        }
    });
});

module.exports = router;
