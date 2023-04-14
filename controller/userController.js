const userModel = require('../models/userModel')
module.exports.getUser = async function getUser(req,res){
    try{
        let id = req.id;
        let user = await userModel.findById(id);// read operation
        if(user){
            res.json({
                message:"Data fetched",
                data:user
            })
        }else{
            console.log('getUser');
            res.json({
                message:'user not found'
            })
        }
    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}
module.exports.postUser = async function postUser(req,res){
    let userToBeAdded = req.body;
    let data = await userModel.create(userToBeAdded);// creation
    res.json({
        message:"Data received successfully",
        data: data
    });
}
module.exports.updateUser = async function updateUser(req,res){
    try{
        let id = req.params.id;
        let user = await userModel.findById(id);
        let keys = []
        let dataToBeUpdated = req.body;
        if(user){
            
            for(let key in dataToBeUpdated){
                keys.push(key);
            }
            for(let i = 0;i < keys.length;i++){
                user[keys[i]] = dataToBeUpdated[keys[i]];
            }
            let data = await user.save();
            res.json({
                message:"Data updated successfully",
                data:data
            })
        }else{
            res.json({
                message:'user not found'
            })
        }
    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}
module.exports.deleteUser = async function deleteUser(req,res){
    try{
        let id = req.params.id;
        
        let user = await userModel.findByIdAndDelete(id);
        if(!user){
            res.json({
                message:'user not found'
            })
        }
        res.json({
            message:"Data deleted successfully",
            data: user
        })
    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}
module.exports.getAllUser = async function getAllUser(req,res){
   try {
        let users = await userModel.find();
        res.json({
            message:'Data fetched successfully',
            data:users
        })
   } catch (error) {
        res.status(500).json({
            message:error.message
        })
   }
}
module.exports.updateProfileImage = function updateProfileImage(req,res){
    // console.log(req.file);
    // console.log(req.body);
    res.json({
        message:"File uploaded successfully"
    })
}