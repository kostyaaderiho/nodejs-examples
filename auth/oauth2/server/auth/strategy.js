const GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require('../models/user');

const setupStrategy = () => {
    return new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_LOGIN_CALLBACK_URL,
            passReqToCallback: true
        },
        async (req, accessToken, refreshToken, profile, cb) => {
            const user = await User.findOne({ googleId: profile.id }).catch(
                (err) => {
                    cb(err, null);
                }
            );

            if (user) {
                return cb(null, user);
            }

            const newUser = new User({
                fullName: `${profile.name.givenName} ${profile.name.familyName}`,
                email: profile.emails[0].value,
                picture: profile.photos[0].value,
                googleId: profile.id
            });

            await newUser.save();

            return cb(null, newUser);
        }
    );
};

module.exports = setupStrategy;
