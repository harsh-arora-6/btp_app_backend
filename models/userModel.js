const { default: mongoose } = require("mongoose");
const emailValidator = require('email-validator');
// const crypto = require('crypto');
const otpGenerator = require('otp-generator');
// connecting database using mongoose
const db_link = 'mongodb+srv://harsh_arora:7OBkLcwXLUbInIc0@cluster0.jfh4zpi.mongodb.net/?retryWrites=true&w=majority';// harsh_arora : <password> 
mongoose.connect(db_link)
.then(function (db){
    // console.log(db);
    console.log("user db connected");
})
.catch(function(err){
    console.log("err ",err);
})
//creating a schema
const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:function(){// email validation using email-validator package
            return emailValidator.validate(this.email);
        }
    },
    password:{
        type:String,
        required:true,
        minLength:8
    },
    confirmPassword:{
        type:String,
        required:true,
        minLength:8,
        validate:function(){// validating confirm password and password
            return this.confirmPassword == this.password;
        }
    },
    role:{
        type:String,
        enum:['admin','user'],
        default:'user'
    },
    resetToken:String
});
userSchema.methods.generateResetToken = function(){

    // Generate a 6-digit OTP
    const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false });
    // use crypto
    let resetToken = otp
    this.resetToken = resetToken;
    // console.log("reset token allotted",this);
    return resetToken;
}
userSchema.methods.resetPasswordHandler = function(password,confirmPassword){
    // console.log('reset pass handler invoked')
    this.password = password;
    this.confirmPassword = confirmPassword;
    this.resetToken = undefined;
} 
// mongoose hooks pre and post.
userSchema.pre('save',async function(){
    // console.log('before saving',this);// we see that _id is created here by mongoose
    // this.confirmPassword = undefined; // before saving we don't want the confirm password field
    // const salt = await bcrypt.genSaltSync();
    // const hashedPassword = await bcrypt.hash(this.password,salt);
    // this.password = hashedPassword;
})
userSchema.post('save',function(doc){
    // console.log('after saving',doc)
})
const userModel = mongoose.model('userModel',userSchema);
module.exports = userModel;