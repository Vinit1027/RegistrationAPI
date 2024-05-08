import mongoose from "mongoose";

const Schema = mongoose.Schema;


const regModel = new Schema({
    name : {
        type: String,
        required : true
    },
    date_of_birth : {
        type : String,
        required : true
    },
    gender : {
        type : String,
        required : true
    },
    hobbies :{
        type : [String],
        required : true
    },
    state : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    resume : {
        type : String,
        required : true
    }

})


export default mongoose.model('regModel', regModel)