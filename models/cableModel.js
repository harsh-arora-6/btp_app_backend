const { default: mongoose } = require("mongoose");
const emailValidator = require('email-validator');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

// connecting database using mongoose
const db_link = 'mongodb+srv://harsh_arora:7OBkLcwXLUbInIc0@cluster0.jfh4zpi.mongodb.net/?retryWrites=true&w=majority';// harsh_arora : <password> 
mongoose.connect(db_link)
.then(function (db){
    // console.log(db);
    console.log("cable db connected");
})
.catch(function(err){
    console.log("err ",err);
})
//creating a schema
const cableSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    rating:{
        type: Number,
        double: true ,// or double: true for double precision
        required:true
    },
    point_locations:{
        type:[[Number,Number]],
        required:true,
        double:true,
        validate:[(val)=>{return val.length >= 2},'Wire should have atleast two points']
    },
    starting_location:{
        type:String,
        required:true
    },
    ending_location:{
        type:String,
        required:true
    },
    next_maintenance:{
        type:Date,
        required:true
    },
    year_of_manufacture:{
        type:Number,
        required:true
    }
});
const cableModel = mongoose.model('cableModel',cableSchema);
module.exports = cableModel;