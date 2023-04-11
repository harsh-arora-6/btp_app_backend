const express = require('express');
const transformerRouter = express.Router();
const {getAllSubstationTransformers,addNewTransformer,updateTransformer,deleteTransformer, getTransformer} = require('../controller/transformerController.js')

transformerRouter
.route('/:substationId')
.get(getAllSubstationTransformers)

transformerRouter.route('/createtransformer')
.post(addNewTransformer)

transformerRouter
.route('/transformer/:id')
.get(getTransformer)
.patch(updateTransformer)
.delete(deleteTransformer)

module.exports = transformerRouter;


