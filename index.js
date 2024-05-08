import express from 'express';
import regrouter from './routers/reg.router';

require("dotenv").config();
require('./db/connect');


const app = express();

const port = 8002;


// middleware
app.use('/', express.static('public'));
app.use('/uploads', express.static('uploads'));
app.use(express.json())




// Routing

app.use('/apiv1/registration', regrouter);




app.listen(port, ()=> {
    console.log(`Connected on port ${port}`)
})