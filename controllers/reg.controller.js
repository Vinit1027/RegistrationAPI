import multer from 'multer';
import fs from 'node:fs';
import path from 'node:path';
import regModel from '../models/reg.model';



const storage = multer.diskStorage({

    destination: function (req, file, cb) {

        // const dest= path.join(path.dirname(__dirname), 'uploads');

        // console.log(dest)

        if (fs.existsSync('./uploads')) {

            cb(null, './uploads')
        }
        else {
            fs.mkdirSync('./uploads')
            cb(null, './uploads')
        }
    },

    filename: function (req, file, cb) {

        // console.log(file)

        const ext = path.extname(file.originalname)
        // console.log(ext)
        const fileArr = file.originalname.split('.')
        // console.log(fileArr)
        fileArr.pop();

        // console.log(fileArr)

        const newfilename = fileArr.join('.') + '-' + Date.now() + ext;
        // console.log(newfilename)
        cb(null, newfilename)

    }
});


const upload = multer({ storage: storage });



export const getRegdata = async (req, res)=>{

    try {

        const allRegData = await regModel.find();

        if(!allRegData){
            return res.status(500).json({
                message : "Registration data does not exist!!"
            })
        }

        return res.status(200).json({
            data : allRegData,
            message : "Successful"
        })
        
    } catch (error) {
        return res.status(500).json({
            message : err.message
        })
        
    }
}


export const postRegdata = (req, res)=> {
    try {

        const uploadData = upload.single('resume');

        uploadData(req,res,function(er){
            if(er){
            return res.status(500).json({
              message: er.message
            })
          }

        //   console.log(req.body);

          const { name , dob, gender, hobbies, state, address} = req.body;

        //   console.log(hobbies)

          const hobbies2 = hobbies.split(',');

        //   console.log(hobbies2)

        //   console.log(req.file)

          let resume = ''
          if(req.file != undefined){
            resume = req.file.path
          }

          const addRegData = new regModel({
             name : name,
             date_of_birth : dob,
             gender : gender,
             hobbies : hobbies2,
             state : state,
             address : address,
             resume : resume
          })

          addRegData.save();
  
          if(addRegData){
              return res.status(200).json({
                  data : addRegData,
                  message : "Registered Successfully"
              })
          }

        })

    } catch (error) {
        return res.status(500).json({
            message : error.message
        })
    }
}