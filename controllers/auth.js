const bcrypt = require("bcryptjs");
const User = require("../model/user");
const nodemailer = require('nodemailer')
require('dotenv').config()

const transporter  = nodemailer.createTransport({
  service:'gmail',
  host: 'smtp.gmail.com',
   port: 465,
   secure: true,
  auth:{
    user:process.env.USER,
    pass:process.env.PASS
  }
}) 


const getLogin = (req, res) => {
  res.render("login.ejs",{csrfToken:req.csrfToken()});
};
const postLogin = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const foundedUser = await User.findOne({ email: email });
  if (foundedUser) {
    const passMached = bcrypt.compareSync(password, foundedUser.password);
    if (passMached) {
      req.session.isLogedIn = true;
      req.session.user = foundedUser
      if (req.session.isLogedIn) {
        return res.redirect("/");
      }
    }
    else{
        res.render('login.ejs',{error:'password not mached try again.'})
    }
  } else {
    res.render("login.ejs",{error:'user not found try signup instead!'});
  }
};

const postLogout = async (req, res) => {
  await req.session.destroy();
  res.redirect("/login");
};

const getSignup = (req, res) => {
  res.render("signup.ejs");
};

const postSignup = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const cnfPassword = req.body.cnfPassword;
  const salt = await bcrypt.genSaltSync(12);
  const hash = await bcrypt.hashSync(password, salt);

      User.create({
          email: email,
          password: hash,
        })
        .then(async() => {
            await transporter.sendMail({
              from:'onthefire007@gmail.com',
              to:email,
              subject:'Account successfully created!',
              text:`congratulations ${email} you have successfully created account on shopify`
            }).then(()=>{
              console.log('email sent..')
              res.redirect("/login");
            }).catch(err=>console.log(err))
        })
        .catch((err) => res.render('signup.ejs',{error:"email already exists."}));
   
};

module.exports = {
  getLogin,
  postLogin,
  postLogout,
  getSignup,
  postSignup,
};
