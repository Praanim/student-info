const express = require('express');
const studentRoutes = require("./src/student/routes");


const app = express();
const PORT = 3000;

app.use(express.json());

app.listen(PORT,() => {
    console.log(`App listening on port ${PORT}`);
});

app.get("/",(req,res) =>{
    res.send("Hello world");
});

app.use('/api/v1/students',studentRoutes);
