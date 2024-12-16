const http = require('http');
const fs = require('fs');
const url = require('url');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { use } = require('react');

const app = express();  // manages the request and response fields (get, post etc.)
app.use(cors());   // cross-origin resource sharing - makes sure server can be accessible from different domains
app.use(bodyParser.json());  // Used to parse the json data into an object

// store the data

let users = {};


// Route to get data
app.post('/check', (req,res) =>{
    const {user,password} = req.body;
    console.log(req.body,"first-one")
    
         if(users[user] === password){
             res.json({message:"Logged In Successfully"})
         }
        else{
            res.json({message:"Username or Password incorrect, try different username or password"})
        }
    
})

// Route to add the sign-up details
app.post('/add', (req,res) =>{
    const {user,password} = req.body;
    console.log(req.body);
    if(user && password){
        users[user] = password; // Add details to object
        console.log("Updated object",users)
        res.json(users)
    }
    else{
        res.status(400).json({message:'Details are required'});
    }
});



const PORT = 3002;
app.listen(PORT, () => {
    console.log(`server running on http:localhost:${PORT}`);
})

