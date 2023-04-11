const express = require('express');
const rmuRouter = express.Router();
const {getAllRmus,getRmuBasedOnSubstationId,addNewRmu,updateRmu,deleteRmu, getRmu} = require('../controller/rmuController.js')

rmuRouter
.route('/')
.get(getAllRmus)

rmuRouter
.route('/:substationId')
.get(getRmuBasedOnSubstationId)

rmuRouter.route('/creatermu')
.post(addNewRmu)

rmuRouter
.route('/rmu/:id')
.get(getRmu)
.patch(updateRmu)
.delete(deleteRmu)

module.exports = rmuRouter;


