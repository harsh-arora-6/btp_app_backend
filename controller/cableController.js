const cableModel = require('../models/cableModel')

module.exports.getAllCables = async function getAllCables(req,res){
    try {
        // console.log('req received in all cables');
         let cables = await cableModel.find();
         res.json({
             message:'Task Successful',
             data:cables
         })
    } catch (error) {
         res.status(500).json({
             message:error.message
         })
    }
 }
 module.exports.getCable = async function getCable(req,res){
    try {
         let cable = await cableModel.findById(req.params.id);
         res.json({
             message:'Task Successful',
             data:cable
         })
    } catch (error) {
         res.status(500).json({
             message:error.message
         })
    }
 }
 module.exports.addNewCable = async function addNewCable(req,res){
    try {
        const cableData = req.body;
        let newCable = await cableModel.create(cableData)
        // newCable.point_locations.map((point_location) => point_location.map((point)=> point.toFixed(8)));
        // await newCable.save();
        // console.log(newCable);
        res.status(200).json({
            message:'Task Successful',
            data:newCable
        })
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
 }
 module.exports.updateCable = async function updateCable(req,res){
    try{
        let id = req.params.id;
        let cable = await cableModel.findById(id);
        let keys = []
        let cableToBeUpdated = req.body;
        if(cable){
            
            for(let key in cableToBeUpdated){
                keys.push(key);
            }
            for(let i = 0;i < keys.length;i++){
                cable[keys[i]] = cableToBeUpdated[keys[i]];
            }
            let data = await cable.save();
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
 module.exports.deleteCable = async function deleteCable(req,res){
    try {
        const id = req.params.id;

        const deletedCable = await cableModel.findByIdAndDelete(id);
        res.status(200).json({
            message:'Task Successful',
            data:deletedCable
        })
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
 }