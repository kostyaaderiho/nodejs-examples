const passport = require('passport');
const session = require('express-session');

const setupStrategy = require('./strategy');
const route = require('./router');

const isUserAuthenticated = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.status(401).send('You must login first!');
    }
};

const setupAuth = () => {
    const strategy = setupStrategy();

    passport.use(strategy);

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });

    return [
        session({
            secret: process.env.SESSION_COOKIE_SECRET_KEY,
            name: 'sso-saml',
            resave: false,
            saveUninitialized: false,
            cookie: {
                maxAge: 3600000
            }
        }),
        passport.initialize(),
        passport.session(),
        route(passport)
    ];
};

module.exports = { setupAuth, isUserAuthenticated };
