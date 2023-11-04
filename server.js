const express = require('express')
const bodyParser = require('body-parser')
const adminRouter = require('./routes/admin')
const connectDatabase = require('./utils/database')
const shopRouter = require('./routes/shop')
const session = require('express-session')
const MongoDbSession = require('connect-mongodb-session')(session)
const authRouter = require('./routes/auth')
const {csrfSync} = require("csrf-sync");
const cookieParser = require('cookie-parser')
const User = require('./model/user')
require('dotenv').config()



const app = express()
const username = process.env.MONGODB_USERNAME
const password = process.env.MONGODB_PASS
const store = new MongoDbSession({
    uri:`mongodb+srv://${username}:${password}@cluster0.bhci9is.mongodb.net/shop?retryWrites=true&w=majority`,
    collection:'session'
})

const {csrfSynchronisedProtection} = csrfSync({
    getTokenFromRequest:(req)=>req.body["CSRFToken"]
})

app.set('view-engine','ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser())
app.use(session({
    secret:"pramodthegreat",
    resave:false,
    saveUninitialized:false,
    store:store
}))

app.use(csrfSynchronisedProtection)
app.use(async(req,res,next)=>{
    res.locals.csrfToken = req.csrfToken()
    next() 
})

app.use(async(req,res,next)=>{
    if(req.session.user){
        req.user = await User.findOne({_id:req.session.user._id})
    }
    next()
})





//auth 
app.use(authRouter)
//setting shop route
app.use(shopRouter)
//setting up admin route
app.use("/admin/shop",adminRouter)



const PORT = process.env.PORT || 5000
app.listen(PORT,async()=>{
    await connectDatabase()
    console.log(`server runing on port ${PORT}`)
})

