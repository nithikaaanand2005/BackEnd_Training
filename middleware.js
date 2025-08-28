const express = require("express");
const app=express();
app.use(express.json());
app.post('/data',middleware,sendData);

function sendData(req,res){
   const data=req.body;
   res.json({message:'Data received successfully',data:data});
}
function middleware(req,res,next){
    console.log("Middleware executed");
    next();
}
app.listen(8000);