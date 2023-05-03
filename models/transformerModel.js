const { default: mongoose } = require("mongoose");
const emailValidator = require('email-validator');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
// connecting database using mongoose
const db_link = 'mongodb+srv://btpwork2023:RQGIXQJBl4uXxlM9@cluster0.suefava.mongodb.net/?retryWrites=true&w=majority';// harsh_arora : <password> 
mongoose.connect(db_link)
.then(function (db){
    // console.log(db);
    console.log("transformer db connected");
})
.catch(function(err){
    console.log("err ",err);
})
//creating a schema
const transformerSchema = mongoose.Schema({
    // name:{
    //     type:String,
    //     required:true,
    // },
    // rated_power:{
    //     type:Number,
    //     double:true,
    //     required:true
    // },
    // impedance:{
    //     type:Number,
    //     double:true,
    //     required:true
    // },
    // next_maintenance:{
    //     type:Date,
    //     required:true
    // },
    // rated_primary_voltage:{
    //     type:Number,
    //     double:true,
    //     required:true
    // },
    // rated_secondary_voltage:{
    //     type:Number,
    //     double:true,
    //     required:true
    // },
    // year_of_manufacture:{
    //     type:Number,
    //     required:true
    // },
    properties:{
        type:Object
    },
    substation:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'substationModel'
    }
});
// transformerSchema.pre(/^find/,function(next){
//     this.populate('substation');
//     next();
// })
const transformerModel = mongoose.model('transformerModel',transformerSchema);
module.exports = transformerModel;