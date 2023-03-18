const { default: mongoose } = require("mongoose");
const emailValidator = require('email-validator');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

// connecting database using mongoose
const db_link = 'mongodb+srv://harsh_arora:7OBkLcwXLUbInIc0@cluster0.jfh4zpi.mongodb.net/?retryWrites=true&w=majority';// harsh_arora : <password> 
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
    name:{
        type:String,
        required:true,
    },
    rated_power:{
        type:Number,
        float:true,
        required:true
    },
    rated_voltage:{
        type:Number,
        float:true,
        required:true
    },
    rated_current:{
        type:Number,
        float:true,
        required:true
    },
    impedance:{
        type:Number,
        float:true,
        required:true
    },
    turns_ratio:{
        type:Number,
        float:true,
        required:true
    },
    efficiency:{
        type:Number,
        float:true,
        required:true
    },
    next_maintenance:{
        type:Date,
        required:true
    }
});
const transformerModel = mongoose.model('transformerModel',transformerSchema);
module.exports = transformerModel;