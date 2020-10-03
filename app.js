const express = require('express');
const authRoutes = require('./routes/auth-routes');
const billingRoutes = require('./routes/billing-routes');
const surveyRoutes = require('./routes/survey-routes');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const passport = require('passport');
const cors = require('cors');
const KEYS = require('./config/keys');
const app = express();


require('./models/survey');
require('./models/user');
require('./services/passport');

app.use(cors());
app.use(bodyParser.json());

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [KEYS.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());


app.use(authRoutes);
app.use(billingRoutes);
app.use(surveyRoutes);

module.exports = app;