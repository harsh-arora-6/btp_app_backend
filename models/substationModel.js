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
    properties:{
        type:Object
    },
    transformers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'transformerModel',
    }],
    location:{
        // type:[mongoose.Types.Double],
        type:[Number],
        set: (values) => {
            return values.map((value) => value.toFixed(8));
        },
        double:true,
    },
    rmu:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'rmuModel'
    },
    lt_panel:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'ltpanelModel'
    }
});
substationSchema.pre(/^find/,function(next){
    this.populate('transformers');
    this.populate('rmu');
    this.populate('lt_panel');
    next();
})
// substationSchema.pre('save',function(next){
//     this.populate('transformers');
//     next();
// })
const substationModel = mongoose.model('substationModel',substationSchema);
module.exports = substationModel;