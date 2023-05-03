const { default: mongoose } = require("mongoose");

// connecting database using mongoose
const db_link = 'mongodb+srv://btpwork2023:RQGIXQJBl4uXxlM9@cluster0.suefava.mongodb.net/?retryWrites=true&w=majority';// harsh_arora : <password> 
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
    // incomers:{
    //     type:Number,
    //     required:true
    // },
    // outgoers:{
    //     type:Number,
    //     required:true
    // },
    // incomer_rated_current:{
    //     type:Number,
    //     double:true,
    //     set: (value) => {
    //         return value.toFixed(2);
    //     },
    //     required:true
    // },
    // outgoer_rated_current:{
    //     type:Number,
    //     double:true,
    //     set: (value) => {
    //         return value.toFixed(2);
    //     },
    //     required:true
    // },
    properties:{
        type:Object
    },
    substation:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    }
});

const ltpanelModel = mongoose.model('ltpanelModel',ltpanelSchema);
module.exports = ltpanelModel;