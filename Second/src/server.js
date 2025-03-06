import express from "express";
import path, {dirname} from "path"
import { fileURLToPath } from "url";
    const app = express();
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename)

    const Port = process.env.Port || 5000;

    app.use(express.static(path.join(__dirname, "../public")))

    app.use(express.json())

    app.get("/", (req,res)=>{
        res.sendFile(path.join(__dirname, "public", "index.html"))
    
    })

        app.listen(Port, ()=>{
            console.log(`Server is running on ${Port}`)
        })

        