const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const KEYS = require('../config/keys');
const User = require('../models/user');

passport.serializeUser((user,done) => {
    console.log(user.id);
    done(null,user.id);
});

passport.deserializeUser((id,done) => {
    User.findById(id).then(user => {
       done(null,user); 
    });
});

passport.use(new GoogleStrategy({
    
    clientID: KEYS.googleClientID,
    clientSecret: KEYS.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true

    }, async (accessToken,refreshToken,profile,done) => {
        const existingUser = await User.findOne({googleId: profile.id});
        if(existingUser) {
            //console.log('User exist');
            done(null,existingUser);
        }else{
            var newUser = new User({googleId: profile.id});
            await newUser.save();
            //console.log('User saved');
            done(null,newUser);
        }
    }
));