const ltpanelModel = require('../models/ltpanelModel');
const rmuModel = require('../models/rmuModel');
const substationModel = require('../models/substationModel');
const transformerModel = require('../models/transformerModel');

module.exports.getAllSubstations = async function getAllSubstations(req,res){
    try {
         let substations = await substationModel.find();
         res.json({
             message:'Task Successful',
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
        // console.log(newsubstation);
        res.status(200).json({
            message:'Task Successful',
            data:newsubstation
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:error.message
        })
    }
 }
 module.exports.getSubstation = async function getSubstation(req,res){
    try {
         let substation = await substationModel.findById(req.params.id);
         res.json({
             message:'Task Successful',
             data:substation
         })
    } catch (error) {
         res.status(500).json({
             message:error.message
         })
    }
 }
 module.exports.updateSubstation = async function updateSubstation(req,res){
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
            // invoking find so that population takes place as we require in the front end
            data = await substationModel.findById(id);
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
 module.exports.deleteSubstation = async function deleteSubstation(req,res){
    try {
        const id = req.params.id;

        const deletedsubstation = await substationModel.findByIdAndDelete(id);
        const transformers = deletedsubstation.transformers;
        // delete all the transformers present in deleted substation
        if(transformers && transformers.length)
            transformers.forEach(async element => {
                await transformerModel.findByIdAndDelete(element._id)
            });
        let rmu = deletedsubstation.rmu;
        let lt_panel = deletedsubstation.lt_panel;
        // If rmu present , delete it
        if(rmu){
            await rmuModel.findByIdAndDelete(rmu._id)
        }
        if(lt_panel){
            await ltpanelModel.findByIdAndDelete(lt_panel._id)
        }
        res.status(200).json({
            message:'Task Successful',
            data:deletedsubstation
        })
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
 }