const express = require('express');
const _ = require('lodash');
const { Path } = require('path-parser');
const { URL } = require('url');
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

router.post('/api/surveys/webhooks', async (req, res) => {
    const events = _.map(req.body, (event) => {
        const pathname = new URL(event.url).pathname;
        const p = new Path('/api/surveys/:surveyId/:choice');
        const match = p.test(pathname);
        if(match) {
            return {email: event.email , surveyId: match.surveyId , choice: match.choice}
        }
    });

    console.log(events);

    for(var i = 0 ; i < events.length ; i++) {
        const { surveyId , email, choice } = events[i];
        await Survey.findOneAndUpdate(
            {
                _id: surveyId,
                recipients : {
                    $elemMatch: {email: email , responded: false}
                }
            },
            {
                $inc: { [choice]: 1 },
                $set: { 'recipients.$.responded': true },
                lastResponded: new Date()
            }
        ).exec();
    }

    res.send({});

});

router.get('/api/surveys', currentUser , requireAuth , async (req, res) => {
    const surveys = await Survey.find({_user: req.currentUser.id}).select({recipients: false});
    res.send(surveys);
});

router.get('/api/surveys/:surveyId/:choice', async (req, res) =>{
    res.send('Thanks for voting');
});

module.exports = router;