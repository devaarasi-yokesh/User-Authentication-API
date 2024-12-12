const http = require('http');
const fs = require('fs');
const url = require('url');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();  // manages the request and response fields (get, post etc.)
app.use(cors());   // cross-origin resource sharing - makes sure server can be accessible from different domains
app.use(bodyParser.json());  // Used to parse the json data into an object

// store the data

let users = {};


// Route to get data


// Route to add the sign-up details
app.post('/add', (req,res) =>{
    const {user,pwd } = req.body;
    if(user){
        users[user] = pwd; // Add details to object
        res.json({message:'Details added'})
    }
    else{
        res.status(400).json({message:'Details are required'});
    }
});



const PORT = 3002;
app.listen(PORT, () => {
    console.log(`server running on http:localhost:${PORT}`);
})

