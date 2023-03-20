const express = require('express');
const ltpanelRouter = express.Router();
const {getAllLtpanels,addNewLtpanel,updateLtpanel,deleteLtpanel, getLtpanel} = require('../controller/ltpanelController.js')

ltpanelRouter
.route('/')
.get(getAllLtpanels)

ltpanelRouter.route('/createltpanel')
.post(addNewLtpanel)

ltpanelRouter
.route('/ltpanel/:id')
.get(getLtpanel)
.patch(updateLtpanel)
.delete(deleteLtpanel)

module.exports = ltpanelRouter;


