import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import 'dotenv/config'
import connectDb from "./config/mongodb.js";
import authRouter from './routes/authRoutes.js'
import mentorRouter from "./routes/mentorRoutes.js";

const app = express();
const PORT = process.env.PORT || 5003;
connectDb();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",  // your React app URL
    credentials: true,
  }));

app.get('/', (req, res)=> res.send("api working"))
app.use('/api/mentor/',mentorRouter);
app.use('/api/auth', authRouter);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));