const { default: mongoose } = require("mongoose");
const emailValidator = require('email-validator');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

// connecting database using mongoose
const db_link = 'mongodb+srv://harsh_arora:7OBkLcwXLUbInIc0@cluster0.jfh4zpi.mongodb.net/?retryWrites=true&w=majority';// harsh_arora : <password> 
mongoose.connect(db_link)
.then(function (db){
    // console.log(db);
    console.log("substation db connected");
})
.catch(function(err){
    console.log("err ",err);
})
//creating a schema
const substationSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    transformers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'transformerModel',
    }],
});
substationSchema.pre(/^find/,function(next){
    this.populate('transformers');
    next();
})
const substationModel = mongoose.model('substationModel',substationSchema);
module.exports = substationModel;