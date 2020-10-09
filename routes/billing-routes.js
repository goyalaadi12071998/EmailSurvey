const KEYS = require('../config/keys');
const express = require('express');
const router = express.Router();
const stripe = require('stripe')(KEYS.stripeSecretKey);
const User = require('../models/user');
const currentUser = require('../middlewares/current-user');
const requireAuth = require('../middlewares/require-auth');


router.post('/api/stripe', currentUser , requireAuth , async (req, res) => {
    const charge = await stripe.charges.create({
        amount: 500,
        currency: 'INR',
        description: 'Charge for fun',
        source: req.body.id
    });
    const user = await User.findById(req.currentUser.id);
    user.credits += 5;
    await user.save();
    res.send(user);
});

module.exports = router;