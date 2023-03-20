const substationModel = require('../models/substationModel');
const transformerModel = require('../models/transformerModel')

module.exports.getAllTransformers = async function getAlltransformers(req,res){
    try {
         let transformers = await transformerModel.find();
         res.json({
             message:'Task Successful',
             data:transformers
         })
    } catch (error) {
         res.status(500).json({
             message:error.message
         })
    }
 }
 module.exports.getTransformer = async function getTransformer(req,res){
    try {
         let transformer = await transformerModel.findById(req.params.id);
         res.json({
             message:'Task Successful',
             data:transformer
         })
    } catch (error) {
         res.status(500).json({
             message:error.message
         })
    }
 }
 module.exports.addNewTransformer = async function addNewtransformer(req,res){
    try {
        const transformerData = req.body;
        const newtransformer = await transformerModel.create(transformerData)
        const substation = await substationModel.findOne({_id:newtransformer.substation});
        substation.transformers.push(newtransformer._id);
        await substation.save();
        res.status(200).json({
            message:'Task Successful',
            data:newtransformer
        })
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
 }
 
 module.exports.updateTransformer = async function updatetransformer(req,res){
    try{
        let id = req.params.id;
        let transformer = await transformerModel.findById(id);
        let keys = []
        let transformerToBeUpdated = req.body;
        if(transformer){
            
            for(let key in transformerToBeUpdated){
                keys.push(key);
            }
            for(let i = 0;i < keys.length;i++){
                transformer[keys[i]] = transformerToBeUpdated[keys[i]];
            }
            let data = await transformer.save();
            res.json({
                message:"Task Successful",
                data:data
            })
        }else{
            res.json({
                message:'Data not found'
            })
        }
    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
 }
 module.exports.deleteTransformer = async function deletetransformer(req,res){
    try {
        const id = req.params.id;

        const deletedtransformer = await transformerModel.findByIdAndDelete(id);
        let parentSubstation = await substationModel.findById(deletedtransformer.substation);
        parentSubstation.transformers = parentSubstation.transformers.filter((transformer)=>transformer._id != deletedtransformer._id);
        await parentSubstation.save();
        res.status(200).json({
            message:'Task Successful',
            data:deletedtransformer
        })
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
 }