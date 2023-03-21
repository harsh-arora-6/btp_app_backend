const { default: mongoose } = require("mongoose");

// connecting database using mongoose
const db_link = 'mongodb+srv://harsh_arora:7OBkLcwXLUbInIc0@cluster0.jfh4zpi.mongodb.net/?retryWrites=true&w=majority';// harsh_arora : <password> 
mongoose.connect(db_link)
.then(function (db){
    // console.log(db);
    console.log("rmu db connected");
})
.catch(function(err){
    console.log("err ",err);
})
//creating a schema
const rmuSchema = mongoose.Schema({
    way:{
        type:Number,
        required:true
    },
    circuit_breaker_rating:{
        type:Number,
        set: (value) => {
            return value.toFixed(2);
        },
        required:true
    },
    substation:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    }
});

const rmuModel = mongoose.model('rmuModel',rmuSchema);
module.exports = rmuModel;