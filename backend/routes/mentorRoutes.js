import express from 'express';
import {getMentors} from '../controllers/mentorController.js';
// import userAuth from '../middleware/userAuth.js';


const mentorRouter = express.Router();

mentorRouter.get('/mentor-data' , getMentors);

export default mentorRouter;