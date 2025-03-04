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

app.post('/add-user', (req, res) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required" });
    }
  
    const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
    
    db.query(sql, [username, password], (err, result) => {
      if (err) {
        console.error('Error inserting data:', err);
        res.status(500).send('Database error');
      } else {
        res.json({ message: 'User added', id: result.insertId });
      }
    });
  });

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
});