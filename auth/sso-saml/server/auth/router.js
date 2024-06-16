const express = require('express');
const urlencoded = require('body-parser').urlencoded;

const route = (passport) => {
    const authRouter = express.Router();

    authRouter.get('/login/saml', passport.authenticate('saml'), (req, res) => {
        res.redirect('/');
    });

    authRouter.post(
        '/login/saml/callback',
        urlencoded({ extended: false }),
        passport.authenticate('saml'),
        (req, res) => {
            res.redirect('/');
        }
    );

    return authRouter;
};

module.exports = route;
