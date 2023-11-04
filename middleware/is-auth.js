const auth = (req,res,next)=>{
    if(req.session.isLogedIn){
        return next()
    }
    return res.redirect('/login')

}

module.exports = auth