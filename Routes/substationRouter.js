const express = require('express');
const substationRouter = express.Router();
const {getAllSubstations,addNewSubstation,updateSubstation,deleteSubstation,getSubstation} = require('../controller/substationController.js')

substationRouter
.route('/')
.get(getAllSubstations)

substationRouter.route('/createsubstation')
.post(addNewSubstation)

substationRouter
.route('/substation/:id')
.get(getSubstation)
.patch(updateSubstation)
.delete(deleteSubstation)

module.exports = substationRouter;


