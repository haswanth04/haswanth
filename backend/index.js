const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const path=require("path");

// Import routes
const studentRoutes = require('./routes/studentRoutes');
const facultyRoutes = require('./routes/facultyRoutes');

// Configure environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Routes
app.use('/api', studentRoutes);   // Student routes
app.use('/api', facultyRoutes);
   // Faculty routes
const __dirname1 =path.resolve();

if(process.env.NODE_ENV==='production'){
 app.use(express.static(path.join(__dirname1,"/frontend/build")));
 app.get('*',(req,res)=>{
    res.sendFile(__dirname1,"frontend","build","index.html")
 })
}
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
