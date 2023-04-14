const nodemailer = require('nodemailer');

module.exports.sendMail = async function sendMail(text,data){
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "harsharora614614@gmail.com", // generated ethereal user
            pass: "pmoujttwsrtdanmc", // generated ethereal password
        },
    });
    var Osubject,Otext,Ohtml
    if(text == "signup"){
        Osubject = "Thank you for signing up!!!";
        Ohtml = `<h1>Welcome to Food App</h1>
        Hope you are having a good time!!
        Your details are:-
        Name: ${data.name}
        email:${data.email}`
    }else{
        Osubject = "Reset Password";
        Ohtml = `<h1>Reset your password using following link</h1>
        Link: ${data.resetLink}`
    }

    let info = await transporter.sendMail({
        from: '"Test mail 👻" <harsharora614614@gmail.com>', // sender address
        to: data.email, // list of receivers
        subject: Osubject, // Subject line
        // text: "Hello world?", // plain text body
        html: Ohtml, // html body
    });
}