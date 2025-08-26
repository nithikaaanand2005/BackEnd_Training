/*const http = require('http');

http.createServer((req, res) => { 
    let route = req.url;
    if(route == "/home"){
        res.end("Home");
    }
    else if(route == "/about"){
        res.end("About");   
    }
    else if(route == "/contact"){
        res.end("Contact");
    }
    else {
        res.end("not found");
    }
}).listen(8000);
*/
const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/studentdb")
    .then(() => console.log("connected to db"))
    .catch((err) => console.log("DB Connection error", err));

const studentSchema = new mongoose.Schema({
    name: String,
    age: Number,
    department: String,
    rollNo: String
});
const Student = mongoose.model("Student", studentSchema);

app.post("/insert", async (req, res) => {
  const { name, age, department, rollNo } = req.body;

  const newStudent = new Student({ name, age, department, rollNo,});

  try {
    await newStudent.save();
    res.status(201).send("Student inserted");
  } catch (error) {
    res.status(400).send("Error saving student");
  }
});

app.get('/getAllStudents',async (req,res) => {
    try {
        const data = await Student.find();
        res.send(data);
    }
    catch (error) {
        res.status(500).send("Error fetching students");
    }
});

app.get('/getStudentByRollNo',async (req,res) => {
    try{
        const {rollNo} = req.body;
        const data = await Student.findOne({rollNo})
        if(data) {
            res.send(data);
        } else {
            res.status(404).send("Student not found");
        }
    }
    catch (error){
        res.status(500).send("Error fetching students");
    }
});
app.delete('/deleteStudentByRollNo',async (req,res) => {
    const {rollNo} = req.body;
    try {
        const deletecount = await Student.deleteOne({rollNo});
        console.log(deletecount,rollNo);
        if(deletecount.deletedCount > 0) {
            res.send("Student Deleted");
        } else {
            res.status(404).send("Student not found");
        }
    } catch (error) {
        res.send("Error deleting student");
    }
});
app.delete('/deleteStudent', async (req, res) => {
    const { rollNo } = req.body;
    try {
        const deleteStudent = await Student.findOneAndDelete({ rollNo });
        console.log(deleteStudent, rollNo);
        if (deleteStudent) {    
            res.send("Student Deleted");
        }
        else {
            res.status(404).send("Student not found");
        }
    } catch (error) {
        res.send("Error deleting student");
    }
});
app.get('/getStudentByParams/:rollNo', async (req, res) => {
    try {
        const { rollNo } = req.params;
        const data = await Student.findOne({ rollNo })
        if (data) {
            res.send(data);
        } else {
            res.status(404).send("Student not found");
        }
    } catch (error) {
        res.status(500).send("Error fetching students");
    }
});
app.get('/getStudentByQuery', async (req, res) => {
    try {
        const { rollNo } = req.query;
        const data = await Student.findOne({ rollNo })
        if (data) {
            res.send(data);
        } else {
            res.status(404).send("Student not found");
        }
    } catch (error) {
        res.status(500).send("Error fetching students");
    }
});

app.listen(3000);