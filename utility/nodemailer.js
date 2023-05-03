const nodemailer = require('nodemailer');
const cableModel = require('../models/cableModel')
const transformerModel = require('../models/transformerModel')

module.exports.sendMail = async function sendMail(){
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "btpwork2023@gmail.com", // generated ethereal user
            pass: "fofysyqdnhttsvmh", // generated ethereal password
        },
    });
    let cables = await cableModel.find();
    let transformers = await transformerModel.find();
    let arr = [cables,transformers];
    let names = ['cable','transformer']
    for(let a of arr){
        for(let i = 0;i < arr.length;i++){
            
            let name = names[i]
            for(let j = 0;j < arr[i].length;j++){
                let now = Date.now();
                let object = arr[i][j]
                let {next_maintenance} = arr[i][j];
                if(next_maintenance.getTime() < now){
                    await transporter.sendMail({
                        from: '<btpwork2023@gmail.com>', // sender address
                        to: 'butterchiken123321@gmail.com', // list of receivers
                        subject: `Maintence Reminder for ${name} "${object.name}"`,
                        text: `The maintenance of ${name} "${object.name}" was due on ${next_maintenance.toDateString()} and has not been completed yet. Please take action to complete it as soon as possible.`
                    });
                }
            }
            
        }
    }
}