import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv'
import ConnectDB from './config/db.js';
import authRouter from './routes/auth.routes.js';
import brandRouter from './routes/brand.routes.js';
import carRouter from './routes/cars.routes.js';
import reviewRouter from './routes/review.routes.js';
import whislistRouter from './routes/whislist.routes.js';
import banRouter from './routes/ban.routes.js';
import totalRouter from './routes/total.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 2003;

ConnectDB();

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174", process.env.ADMIN_URL, process.env.FRONTEND_URL],
    credentials: true
}));

app.use("/api/auth", authRouter);
app.use("/api/brand", brandRouter);
app.use("/api/car", carRouter);
app.use("/api/review", reviewRouter);
app.use("/api/wishlist", whislistRouter);
app.use("/api/ban", banRouter)
app.use("/api/total", totalRouter);

app.get("/", (req, res) => {
    res.send("API WORKING")
})

app.listen(PORT, () => {
    console.log(`Running on: ${PORT}`)
})