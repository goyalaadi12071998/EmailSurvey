const express = require('express');
const router = express.Router();
const requireCredits = require('../middlewares/requireCredits');
const Survey = require('../models/survey');
const Mailer = require('../services/Mailer');
const User = require('../models/user');
const requireAuth = require('../middlewares/require-auth');
const currentUser = require('../middlewares/current-user');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

router.post('/api/survey', currentUser, requireAuth, requireCredits , async (req, res) => {
    const { title, body, subject, recipients } = req.body;
    const survey = new Survey({
        title: title,
        body: body,
        subject: subject,
        recipients: recipients.split(',').map(email => {return {email: email.trim()}} ),
        _user: req.currentUser.id,
        dateSent: Date.now()
    });

    try {    
        const mailer = await new Mailer(survey,surveyTemplate(survey));
        await mailer.send();
        console.log('sent');
        await survey.save();
        const user = await User.findById(req.currentUser.id);
        user.credits = user.credits-5;
        await user.save();
        res.send({user: user , survey: survey});
    }
    catch(err){
        console.log('Error',err);
        res.send(err);
    }

});

module.exports = router;