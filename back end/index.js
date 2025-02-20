const db = require("./config/db.js");
const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(cors());

app.get("/api",(req,res) => {
    db.query("SELECT * FROM users", (err, result) => {
        if(err){
            console.log(err);
        }
        console.log(result);
        res.send(`Your name is ${result[0].username} and your password is ${result[0].password}`);
    });
    console.log(db);
});
app.get("/api/users", (req, res) => {
    db.query("SELECT * FROM users", (err, result) => {
        if(err){
            console.log(err);
            res.status(500);
            res.send(err);
        }
        else{
            res.status(200);
            console.log(result);
            res.send(JSON.stringify(result));
        }
        
    });
});

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
});