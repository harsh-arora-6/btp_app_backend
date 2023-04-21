const express = require('express');
const userRouter = express.Router();
const {getUser,getAllUser,updateUser,deleteUser,updateProfileImage} = require('../controller/userController');
const {login,signup,protectRoute,isAuthorised,forgetPassword,resetPassword,logout} = require('../controller/authController');

//login
userRouter
.route('/login')
.post(login)

//signup
userRouter
.route('/signup')
.post(signup)

//forget password
userRouter
.route('/forgetpassword')
.post(forgetPassword)

//reset password
userRouter
.route('/resetpassword')
.post(resetPassword)

//logout
userRouter
.route('/logout')
.get(logout)

//user options
userRouter
.route('/:id')
.get(getUser)
.patch(updateUser)
.delete(deleteUser)

module.exports = userRouter;