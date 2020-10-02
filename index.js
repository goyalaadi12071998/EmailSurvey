const mongoose = require('mongoose');
const KEYS = require('./config/keys');
const app = require('./app');
const User = require('./models/user');
const { use } = require('passport');
 
async function start() {
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