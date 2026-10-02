import express from "express"
import authrouter from "./routes/auth.routes";

const app = express();

app.use(express.json());
app.use("/api/auth",authrouter)

// app.get("/",(req,res)=>{
//     res.json({
//         message:"GET Request from root "
//     })
// })



export default app;