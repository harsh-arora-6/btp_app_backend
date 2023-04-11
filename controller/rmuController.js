const rmuModel = require('../models/rmuModel');
const substationModel = require('../models/substationModel');

module.exports.getAllRmus = async function getAllrmus(req,res){
    try {
         let rmus = await rmuModel.find();
         res.json({
             message:'Task Successful',
             data:rmus
         })
    } catch (error) {
         res.status(500).json({
             message:error.message
         })
    }
 }
 module.exports.getRmuBasedOnSubstationId = async function getRmuBasedOnSubstationId(req,res){
    try {
         let rmus = await rmuModel.findOne({"substation":req.params.substationId});
         res.json({
             message:'Task Successful',
             data:rmus
         })
    } catch (error) {
         res.status(500).json({
             message:error.message
         })
    }
 }
 module.exports.getRmu = async function getrmu(req,res){
    try {
         let rmu = await rmuModel.findById(req.params.id);
         res.json({
             message:'Task Successful',
             data:rmu
         })
    } catch (error) {
         res.status(500).json({
             message:error.message
         })
    }
 }
 module.exports.addNewRmu = async function addNewrmu(req,res){
    try {
        const rmuData = req.body;
        const newrmu = await rmuModel.create(rmuData);

        const substation = await substationModel.findOne({_id:newrmu.substation});
        substation.rmu = newrmu._id;
        await substation.save();
        res.status(200).json({
            message:'Task Successful',
            data:newrmu
        })
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
 }
 module.exports.updateRmu = async function updatermu(req,res){
    try{
        let id = req.params.id;
        let rmu = await rmuModel.findById(id);
        let keys = []
        let rmuToBeUpdated = req.body;
        if(rmu){
            
            for(let key in rmuToBeUpdated){
                keys.push(key);
            }
            for(let i = 0;i < keys.length;i++){
                rmu[keys[i]] = rmuToBeUpdated[keys[i]];
            }
            let data = await rmu.save();
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
 module.exports.deleteRmu = async function deletermu(req,res){
    try {
        const deletedrmu = await rmuModel.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message:'Task Successful',
            data:deletedrmu
        })
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
 }