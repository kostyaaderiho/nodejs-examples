const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const createMemoryStore = require('memorystore');

const User = require('../models/user');
const setupStrategy = require('./strategy');

const MemoryStore = createMemoryStore(session);
const store = new MemoryStore({
    checkPeriod: 3600000
});

const setupGoogleAuth = () => {
    const strategy = setupStrategy();

    passport.use(strategy);

    passport.serializeUser((user, cb) => {
        cb(null, user.googleId);
    });

    passport.deserializeUser(async (id, cb) => {
        const user = await User.findOne({ googleId: id }).catch((err) => {
            cb(err, null);
        });

        if (user) cb(null, user);
    });

    return [
        session({
            secret: process.env.SESSION_COOKIE_SECRET_KEY,
            name: 'oauth2',
            resave: false,
            saveUninitialized: false,
            cookie: {
                maxAge: 3600000
            },
            // The default store is 'MemoryStore' which is not designed for a production environment
            // because it will leak memory, instead we can use 'MongoStore' or 'RedisStore'
            store
            // store: MongoStore.create({
            //     mongoUrl:
            //         'mongodb+srv://aderihokostya:aderiho280993@cluster0.iv5dn3b.mongodb.net/nodejs_examples?retryWrites=true&w=majority'
            // })

            // Uncomment for production
            // cookie: { secure: true }
        }),
        passport.initialize(),
        passport.session()
    ];
};

module.exports = setupGoogleAuth;
