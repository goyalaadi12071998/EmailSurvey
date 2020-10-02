const express = require('express');
const authRoutes = require('./routes/auth-routes');
const cookieSession = require('cookie-session');
const passport = require('passport');
const KEYS = require('./config/keys');
const app = express();


require('./models/user');
require('./services/passport');

app.use(
    cookieSession({
        maxAge: 24*60*60*1000,
        keys: [KEYS.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(authRoutes);

module.exports = app;