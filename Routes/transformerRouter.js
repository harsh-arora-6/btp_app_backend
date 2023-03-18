const express = require('express');
const transformerRouter = express.Router();
const {getAllTransformers,addNewTransformer,updateTransformer,deleteTransformer, getTransformer} = require('../controller/transformerController.js')

transformerRouter
.route('/')
.get(getAllTransformers)

transformerRouter.route('/createtransformer')
.post(addNewTransformer)

transformerRouter
.route('/transformer/:id')
.get(getTransformer)
.patch(updateTransformer)
.delete(deleteTransformer)

module.exports = transformerRouter;


