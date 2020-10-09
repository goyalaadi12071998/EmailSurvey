const express = require('express');
const router = express.Router();
const requireCredits = require('../middlewares/requireCredits');
const Survey = require('../models/survey');
const Mailer = require('../services/Mailer');
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
        user: req.currentUser.id,
        dateSent: Date.now()
    });

    const mailer = new Mailer(survey,surveyTemplate(survey));
    await mailer.send();
});

module.exports = router;