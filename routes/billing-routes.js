const KEYS = require('../config/keys');
const express = require('express');
const router = express.Router();
const stripe = require('stripe')(KEYS.stripeSecretKey);
router.post('/api/stripe', async (req, res) => {
    const charge = await stripe.charges.create({
        amount: 500,
        currency: 'INR',
        description: 'Charge for fun',
        source: req.body.id
    });
    req.user.credits += 5;
    const user = await req.user.save();
    res.send(user);
});

module.exports = router;