const mongoose = require('mongoose');
const KEYS = require('./config/keys');
const process = require('process');
const app = require('./app');
const User = require('./models/user');
const { use } = require('passport');

async function start() {

    if(process.env.NODE_ENV === 'production') {
        if(!process.env.GOOGLE_CLIENT_ID) {
            console.log('Please provide google client id');
            process.exit(1);
        }

        if(!process.env.GOOGLE_CLIENT_SECRET) {
            console.log('Please provide google secret key');
            process.exit(1);
        }

        if(!process.env.DATABASE_URL_STRING) {
            console.log('Please provide database url string');
            process.exit(1);
        }

        if(!process.env.COOKIE_KEY) {
            console.log('Please provide cookie secret');
            process.exit(1);
        }

        if(!process.env.GOOGLE_CALL_BACK_URL) {
            console.log('Please provide google callback url');
            process.exit(1);
        }

        if(!process.env.STRIPE_PUBLISHABLE_KEY) {
            console.log('Please provide stripe publishable key');
            process.exit(1);
        }

        if(!process.env.STRIPE_SECRET_KEY) {
            console.log('Please provide stripe secret key');
            process.exit(1);
        }
    }

    try {
        await mongoose.connect(KEYS.databaseURLString,{
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        
        const port = process.env.PORT || 5000;
    
        app.listen(port, () => {
            console.clear();
            console.log('listening on port ' + port);
        });
    }
    catch (err) {
        console.log('Error connecting to server ' + err);
    }
}

start();