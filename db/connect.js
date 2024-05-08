import mongoose from "mongoose";


const connectionString = process.env.CONNECTION_STRING;



mongoose.connect(connectionString).then(()=> {
    console.log(`CONNECTED TO DATABASE`);
}).catch((err)=> {
    console.log(err);
})