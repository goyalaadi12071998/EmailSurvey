const User = require('../models/user');

module.exports = async (req,res,next) => {
    const user = await User.findById(req.currentUser.id);
    if(user.credits < 1){
        res.send('Require enough credits');
    }
    next();
}