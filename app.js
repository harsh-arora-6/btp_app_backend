const express = require("express");
const app = express();
const cors=require("cors");
const schedule = require('node-schedule');
const {sendMail} = require('./utility/nodemailer.js');
// const {readData,result} = require('./utility/excel');
// const corsOptions ={
// //    origin:'http://localhost:3000', 
//     origin: true,
//    credentials:true,            //access-control-allow-credentials:true
//    optionSuccessStatus:200,
// }


const cookieParser = require('cookie-parser');
const hostname = '127.0.0.1';
const port = 5000;
app.listen(port,hostname,()=>{
    console.log(`Server is Running at http://${hostname}:${port}/`)
});

// middleware functions are those which run after request has been made and before response is sent.
app.use(express.json()); // global middleware
app.use(cookieParser());// to access cookies in req,res 
// app.use(cors(corsOptions))
app.use(cors());

// mini app
//base router to use
const cableRouter = require('./Routes/cableRouter.js');
const transformerRouter = require('./Routes/transformerRouter.js');
const substationRouter = require('./Routes/substationRouter.js');
// const { updateData } = require("./utility/excel.js");
const rmuRouter = require("./Routes/rmuRouter.js");
const ltpanelRouter = require("./Routes/ltpanelRouter.js");
const userRouter = require('./Routes/userRouter');

app.use('/user',userRouter);
app.use('/cables',cableRouter);
app.use('/transformers',transformerRouter);
app.use('/substations',substationRouter);
app.use('/rmus',rmuRouter);
app.use('/ltpanels',ltpanelRouter);
// schedule.scheduleJob('0 0 * * 0', sendMail);
// schedule.scheduleJob('* * * * *', sendMail);
// schedule.scheduleJob('* * * * *', readData);
// console.log(result);