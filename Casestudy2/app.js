// Task1: initiate app and run server at 3000

const path=require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));
// Task2: create mongoDB connection 
const MONGO_URI = "YOUR_MONGODB_ATLAS_CONNECTION_STRING"; // TODO: replace with actual connection string
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Employee Schema and Model
const employeeSchema = new mongoose.Schema({
  name: String,
  location: String,
  position: String,
  salary: Number
});
const Employee = mongoose.model('Employee', employeeSchema);


//Task 2 : write api with error handling and appropriate api mentioned in the TODO below







//TODO: get data from db  using api '/api/employeelist'




//TODO: get single data from db  using api '/api/employeelist/:id'





//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}






//TODO: delete a employee data from db by using api '/api/employeelist/:id'





//TODO: Update  a employee data from db by using api '/api/employeelist'
// Request body format:{_id:'',name:'',location:'',position:'',salary:''}

// GET all employees
app.get('/api/employeelist', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single employee by ID
app.get('/api/employeelist/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ error: 'Employee not found' });
    res.json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create new employee
app.post('/api/employeelist', async (req, res) => {
  try {
    const employee = new Employee(req.body);
    const saved = await employee.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update existing employee (expects _id in body)
app.put('/api/employeelist', async (req, res) => {
  try {
    const updated = await Employee.findByIdAndUpdate(req.body._id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Employee not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE employee by ID
app.delete('/api/employeelist/:id', async (req, res) => {
  try {
    const deleted = await Employee.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Employee not found' });
    res.json({ message: 'Employee deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
//Request body format:{name:'',location:'',position:'',salary:''}


//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});



