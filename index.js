
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
import { router } from "./src/Routes/routes.app.js";
import "dotenv/config";
import ConnectToMongo from "./src/Database/DataBaseConnection/connectToMongo.js";

import bodyParser from "body-parser";
const app =express();
ConnectToMongo()


app.use(cors({
    origin: ['*',"http://localhost:5173"],  
    credentials: true
}));

app.use(cookieParser())
app.use(express.urlencoded({extended:false}))
app.use(express.json({limit:"20kb"}))
app.use("/api",router)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization,')
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.setHeader('Access-Control-Allow-Credentials', 'true')
})
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
});
// app.use(bodyParser.json()); 
app.listen(process.env.PORT,'0.0.0.0',()=>{
    console.log(`Server running on port ${process.env.PORT}`);
    
})

