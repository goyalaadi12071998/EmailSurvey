const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const currentUser = require('../middlewares/current-user');
const requireAuth = require('../middlewares/require-auth');

router.post('/api/users/signup', async (req,res) => {

    const { email , password } = req.body;
    const existingUser = await User.findOne({email : email});
    if(existingUser) {
        res.send('Email already exist');
    }
    const hash = await bcrypt.hash(password,10);
    const user = new User({email: email, password: hash});
    await user.save();
    const userJwt = await jwt.sign({id : user.id},'asdf');

    req.session = {
        jwt: userJwt
    }
    return res.status(201).send(user);
});

router.post('/api/users/signin', async (req, res) => {
    const {email , password} = req.body;
    const existingUser = await User.findOne({email : email});
    if(!existingUser) {
        //throw new Error('User with this email does not exist');
        res.send('User with this email does not exist');
    }
    const passwordMatch = await bcrypt.compare(password,existingUser.password);
    if(!passwordMatch){
        res.send('Credentials does not match');
    }
    const userJwt = await jwt.sign({id : existingUser.id},'asdf');
    req.session = {
        jwt: userJwt
    };
    return res.status(200).send(existingUser);
});


router.get('/api/users/logout', async (req,res) => {
    req.session = null;
    res.send({});
});

router.get('/api/current_user', currentUser , requireAuth , async (req, res) => {
    const user = await User.findById(req.currentUser.id);
    res.send(user);
});

module.exports = router;