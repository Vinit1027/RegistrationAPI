import express from 'express';
import { getRegdata, postRegdata } from '../controllers/reg.controller';


const router = express.Router();


router.get('/get-regdata', getRegdata);

router.post('/post-regdata', postRegdata);


export default router



