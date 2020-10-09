const express = require('express');
const authRoutes = require('./routes/auth-routes');
const billingRoutes = require('./routes/billing-routes');
const surveyRoutes = require('./routes/survey-routes');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const cors = require('cors');
const KEYS = require('./config/keys');
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [KEYS.cookieKey]
    })
);

app.use(authRoutes);
app.use(billingRoutes);
app.use(surveyRoutes);

module.exports = app;