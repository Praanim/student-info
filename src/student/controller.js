const { error } = require("console");
const pool = require("../../db");

const getAllStudents = (req,res) =>{
    pool.query("SELECT * FROM student",(error,results) =>{
        if(error) throw error;
        res.status(200).json(results.rows);
    });

}

module.exports = {
    getAllStudents,
}