const express = require('express');
const cableRouter = express.Router();
const {getAllCables,addNewCable,updateCable,deleteCable, getCable} = require('../controller/cableController.js')

cableRouter
.route('/')
.get(getAllCables)

cableRouter.route('/createcable')
.post(addNewCable)

cableRouter
.route('/cable/:id')
.get(getCable)
.patch(updateCable)
.delete(deleteCable)

module.exports = cableRouter;


