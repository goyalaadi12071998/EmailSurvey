const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user');
const router = express.Router();

router.get('/auth/google',passport.authenticate('google' , {
    scope: ['profile','email']
}));

router.get('/auth/google/callback',passport.authenticate('google'));

router.get('/api/current_user',async (req,res) => {
    //res.send(req.session);
    res.send(req.user);
});

router.get('/api/logout', async (req,res) => {
    req.logout();
    res.send(req.user);
});

module.exports = router;