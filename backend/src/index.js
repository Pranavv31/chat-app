import express from "express";
import dotenv from "dotenv";
import cookieparser from "cookie-parser";
import cors from "cors";

import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.routes.js"
import messageRoute from "./routes/message.routes.js"

dotenv.config();
dotenv.config({ path: "../.env" });
console.log("PORT:", process.env.PORT);
console.log("MONGO_URI:", process.env.MONGO_URI);

const PORT = process.env.PORT || 8080;

const app = express();


app.use(express.json())
app.use(cookieparser())

app.use(
    cors({
        origin:["http://localhost:5173"],
        credentials:true
    })
)
//routes

app.use("/api/auth",authRoutes)
app.use("/api/message",messageRoute)
app.listen(PORT,() =>{
    console.log(`Server is running on port ${PORT}`);
    connectDB()
})