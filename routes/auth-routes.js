const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/auth/google',passport.authenticate('google' , {
    scope: ['profile','email']
}));

router.get('/auth/google/callback',passport.authenticate('google'),(req, res) => {
    res.redirect('/surveys');
});

router.get('/api/current_user',async (req,res) => {
    console.log(req.user);
    res.send(req.user);
});

router.get('/api/logout', async (req,res) => {
    req.logout();
    res.send(req.user);
});

module.exports = router;