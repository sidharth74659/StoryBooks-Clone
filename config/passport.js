// const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const User = require('../models/User')

module.exports = function (passport) {
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: '/auth/google/callback'
            },
            async (accessToken, refreshToken, profile, done) => {
                console.log(profile)
                const newUser = {
                    googleId: profile.id,
                    displayName: profile.displayName,
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    image: profile.photos[0].value
                }

                try {
                    // check if the user exists already in our mongoDB database
                    let user = await User.findOne({ googleId: profile.id })

                    if (user) {
                        done(null, user)
                    } else {
                        user = await User.create(newUser)
                        done(null, user)
                    }

                } catch (err) {
                    console.log(err);

                }
            }
        )
    )

    // Each subsequent request will not contain credentials, but rather the unique cookie that identifies the session. In order to support login sessions, Passport will serialize and deserialize user instances to and from the session
    passport.serializeUser((user, done) => {
        done(null, user.id)
    });

    passport.deserializeUser((id, done) =>
        User.findById(id, function (err, user) {
            done(err, user);
        })
    );
}
