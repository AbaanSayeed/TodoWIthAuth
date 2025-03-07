import express from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import db from "../db.js"

const router = express.Router()

router.post("/register", (req, res)=>{
    const {username, password} = req.body
    

    const hashed  = bcrypt.hashSync(password, 8)
    try{
        const insertUser = db.prepare(`INSERT INTO users(username, password)
        VALUES (?, ?)
        `)
        const result  = insertUser.run(username, hashed)
            const defaultTodo = "HELLO!, Start writing your To-Do's"
            const insertTodo = db.prepare(`INSERT INTO todos(user_id, task) VALUES (?, ?)`)
            
            insertTodo.run(result.lastInsertRowid, defaultTodo)

            const token = jwt.sign({id : result.lastInsertRowid}, process.env.JWT_SECRET, { expiresIn: "24h" })
            
            res.json({token})
            

        
    }
    catch (err){
        console.log(err.message)
        res.sendStatus(504)
    }
    
})

router.post("/login", (req,res)=>{
    const {username, password} = req.body
    console.log(username, password)
    res.sendStatus(200)
})


export default router