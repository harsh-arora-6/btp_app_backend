const substationModel = require('../models/substationModel')

module.exports.getAllSubstations = async function getAllSubstations(req,res){
    try {
         let substations = await substationModel.find();
         res.json({
             message:'Data fetched successfully',
             data:substations
         })
    } catch (error) {
         res.status(500).json({
             message:error.message
         })
    }
 }
 module.exports.addNewSubstation = async function addNewsubstation(req,res){
    try {
        const substationData = req.body;
        const newsubstation = await substationModel.create(substationData)
        res.status(200).json({
            message:'Data Added successfully',
            data:newsubstation
        })
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
 }
 module.exports.getSubstation = async function getSubstation(req,res){
    try {
         let substation = await substationModel.findById(req.params.id);
         res.json({
             message:'Data fetched successfully',
             data:substation
         })
    } catch (error) {
         res.status(500).json({
             message:error.message
         })
    }
 }
 module.exports.updateSubstation = async function updatesubstation(req,res){
    try{
        let id = req.params.id;
        let substation = await substationModel.findById(id);
        let keys = []
        let substationToBeUpdated = req.body;
        if(substation){
            
            for(let key in substationToBeUpdated){
                keys.push(key);
            }
            for(let i = 0;i < keys.length;i++){
                substation[keys[i]] = substationToBeUpdated[keys[i]];
            }
            let data = await substation.save();
            res.json({
                message:"Data updated successfully",
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
 module.exports.deleteSubstation = async function deletesubstation(req,res){
    try {
        const id = req.params.id;

        const deletedsubstation = await substationModel.findByIdAndDelete(id);
        res.status(200).json({
            message:'Data deleted successfully',
            data:deletedsubstation
        })
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
 }