const express = require('express');
const ltpanelRouter = express.Router();
const {getAllLtpanels,addNewLtpanel,updateLtpanel,deleteLtpanel, getLtpanel, getLtpanelBasedOnSubstation} = require('../controller/ltpanelController.js')

ltpanelRouter
.route('/')
.get(getAllLtpanels)

ltpanelRouter
.route('/:substationId')
.get(getLtpanelBasedOnSubstation)

ltpanelRouter.route('/createltpanel')
.post(addNewLtpanel)

ltpanelRouter
.route('/ltpanel/:id')
.get(getLtpanel)
.patch(updateLtpanel)
.delete(deleteLtpanel)

module.exports = ltpanelRouter;


