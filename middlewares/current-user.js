const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    // console.log('Session',req.session);
    // console.log('JWT Toekn',req.session.jwt);
    console.log(req.session.jwt);
    if(!req.session.jwt){
        return next();
    }
    try {
        const payload = jwt.verify(req.session.jwt,'asdf');
        console.log(payload);
        req.currentUser = payload;
    }catch(err){
        return res.send(err);
    }
    next();
}
