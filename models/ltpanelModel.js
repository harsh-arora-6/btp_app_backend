const { default: mongoose } = require("mongoose");

// connecting database using mongoose
const db_link = 'mongodb+srv://harsh_arora:7OBkLcwXLUbInIc0@cluster0.jfh4zpi.mongodb.net/?retryWrites=true&w=majority';// harsh_arora : <password> 
mongoose.connect(db_link)
.then(function (db){
    // console.log(db);
    console.log("ltpanel db connected");
})
.catch(function(err){
    console.log("err ",err);
})
//creating a schema
const ltpanelSchema = mongoose.Schema({
    incomers:{
        type:Number,
        required:true
    },
    outgoers:{
        type:Number,
        required:true
    },
    incomer_rated_current:{
        type:Number,
        double:true,
        required:true
    },
    outgoer_rated_current:{
        type:Number,
        double:true,
        required:true
    },
    substation:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    }
});

const ltpanelModel = mongoose.model('ltpanelModel',ltpanelSchema);
module.exports = ltpanelModel;