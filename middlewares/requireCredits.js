module.exports = (req,res,next) => {
    if(req.currentUser.credits < 1){
        return res.status(403).send('You do not have enough credits');
    }
    next();
}