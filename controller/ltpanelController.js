const ltpanelModel = require('../models/ltpanelModel');
const substationModel = require('../models/substationModel');

module.exports.getAllLtpanels = async function getAllltpanels(req,res){
    try {
         let ltpanels = await ltpanelModel.find();
         res.json({
             message:'Task Successful',
             data:ltpanels
         })
    } catch (error) {
         res.status(500).json({
             message:error.message
         })
    }
 }
 module.exports.getLtpanelBasedOnSubstation = async function getLtpanelBasedOnSubstation(req,res){
    try {
         let ltpanel = await ltpanelModel.findOne({"substation":req.params.substationId});
         res.json({
             message:'Task Successful',
             data:ltpanel
         })
    } catch (error) {
         res.status(500).json({
             message:error.message
         })
    }
 }
 
 module.exports.getLtpanel = async function getltpanel(req,res){
    try {
         let ltpanel = await ltpanelModel.findById(req.params.id);
         res.json({
             message:'Task Successful',
             data:ltpanel
         })
    } catch (error) {
         res.status(500).json({
             message:error.message
         })
    }
 }
 module.exports.addNewLtpanel = async function addNewltpanel(req,res){
    try {
        const ltpanelData = req.body;
        const newltpanel = await ltpanelModel.create(ltpanelData)
        const substation = await substationModel.findOne({_id:newltpanel.substation});
        substation.lt_panel = newltpanel._id;
        await substation.save();
        res.status(200).json({
            message:'Task Successful',
            data:newltpanel
        })
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
 }
 module.exports.updateLtpanel = async function updateltpanel(req,res){
    try{
        let id = req.params.id;
        let ltpanel = await ltpanelModel.findById(id);
        let keys = []
        let ltpanelToBeUpdated = req.body;
        if(ltpanel){
            
            for(let key in ltpanelToBeUpdated){
                keys.push(key);
            }
            for(let i = 0;i < keys.length;i++){
                ltpanel[keys[i]] = ltpanelToBeUpdated[keys[i]];
            }
            let data = await ltpanel.save();
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
 module.exports.deleteLtpanel = async function deleteltpanel(req,res){
    try {
        const id = req.params.id;

        const deletedltpanel = await ltpanelModel.findByIdAndDelete(id);
        res.status(200).json({
            message:'Task Successful',
            data:deletedltpanel
        })
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
 }