const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const {secretKey} = require('../secret');
const { sendMail } = require('../utility/nodemailer_user');

module.exports.protectRoute = async function protectRoute(req,res,next){
    try {
        if(req.cookies.login_backend){
            
            let payload = jwt.verify(req.cookies.login_backend,secretKey);
            let id = req.cookies.login_backend;
            if(id){
                const user = await userModel.findById(payload.payload);
                req.id = user._id;
                req.role = user.role;
                next();
            }
            else{
                res.json({
                    message:'user not verified'
                })
            }
        }else{
            // console.log('protect Route')
            const client = req.get('User-Agent');
            if(client.includes('Mozilla')){
                return res.redirect('/user/login');
            }
            res.json({
                message:"please login"
            })
        }
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
    
}
module.exports.login = async function login(req,res){
    // console.log(req);
    let data = req.body;
    // console.log(data);
    try {
        let user = await userModel.findOne({email:data.email});
        if(user){
            if(user.password == data.password){
                let token = jwt.sign({payload:user['_id']},secretKey);
                res.cookie('login_backend',token,{httpOnly:true});// httpOnly true means on client side we cannot access that cookie
                // console.log(res)
                return res.json({
                    message:'user logged in',
                    data:user
                })
            }else{
                return res.json({
                    message:'wrong credentials'
                })
            }
        }else{
            return res.json({
                message:'please sign up'
            })
        }
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
    
}
module.exports.signup = async function signup(req,res){
    let userToBeAdded = req.body;
    try{
        let user = await userModel.findOne({email:userToBeAdded.email});
        if(user){
            res.json({
                message:'User Already Exists'
            })
        }else{
            let data = await userModel.create(userToBeAdded);// creation
            sendMail("signup",data);
            res.json({
                message:"User Signed up",
                data: data
            });
        }
    }catch(err){
        return res.json({
            message:'Invalid Credentials'
        })
    }
    
}
module.exports.isAuthorised = function isAuthorised(roles){
    return function(req,res,next){
        if(roles.includes(req.role)){
            next();
        }else{
            res.status(401).json({
                message:'unauthorised operation'
            })
        }
    }
}
module.exports.forgetPassword = async function forgetPassword(req,res){
    try {   
        let {email} = req.body;
    
        const user = await userModel.findOne({email:email});
        if(user){
            //generate token
            const token = user.generateResetToken();
            // console.log("forget pass: ",user);
            let link = `${req.protocol}://localhost:3000/auth/resetpassword/${token}`//front end route
            let data = {
                email:user.email,
                resetLink:link
            }
            await user.save();
            sendMail("forgetpassword",data);
            //mail this link.
            res.json({
                message:"Reset Link sent to the specified mail"
            })
        }else{
            res.json({
                message:"please sign up"
            })
        }
    } catch (error) {
        res.json({
            message:error.message
        })
    }
    
}
module.exports.resetPassword = async function resetPassword(req,res){
    try {
        let token = req.params.token;
        let {password,confirmPassword} = req.body;
        const user = await userModel.findOne({resetToken:token});
        if(user){
            user.resetPasswordHandler(password,confirmPassword);
            await user.save();
            res.json({
                message:"Password Changed Successfully"
            })
        }else{
            res.json({
                message:"Link Expired"
            })
        }
    } catch (error) {
        res.json({
            message:error.message
        })
    }
}
module.exports.logout = function logout(req,res){
    res.cookie('login_backend',' ',{maxAge:1});
    res.json({
        message:"user logged out successfully"
    })
}