const queries = require("./queries");
const pool = require("../../db");

const getAllStudents = (req,res) =>{
   
    pool.query(queries.getAllStudentsQuery,(error,results) =>{
        if(error) {           
            res.status(500).json({ error: 'Internal server error' });
        }else{
            res.status(200).json(results.rows);
        }
    });
}

const getStudentById = (req,res) =>{
    const {id} = req.params;
    pool.query(queries.getStudentByIdQuery,[id],(error,results) =>{
        if(error) {           
            res.status(500).json({ error: 'Internal server error' });
        }else{
            if(results.rows.length == 0){
                return res.status(404).json(
                    {
                        message :"There is no existing student for the id"
                   }
                )
            }
            res.status(200).json(results.rows);
        }
    });
}

//create student in db
const createStudent =async (req,res) =>{
    try{
    const {name,email,age,college,dob} = req.body;

    const existingStudentEmail = await pool.query(queries.getStudentByEmailQuery,[email]);
    if(existingStudentEmail.rows.length >0){
        return res.status(409).json({message:"Email already is in use"});
    }

    const results = await pool.query(queries.createStudentQuery,[name,email,age,college,dob]);

    console.log(results.rows);
    res.status(200).json(results.rows);
    }catch(error){
        console.log(error);
        res.status(500).json({message : "INTERNAL SERVER ERROR"});

    }
}

//update student in db
const updateStudentById =async (req,res) =>{
    try{
    const {id}=  req.params;
    const {name,email,age,college,dob} = req.body;

    if(!name || !email || !age || !college || !dob){
        res.status(400).json({message:"All Fields are required"});
        return;
    }

    const results = await pool.query(queries.updateStudentQuery,[name,email,age,college,dob,id]);

    console.log(results.rows[0]);
    res.status(200).json({message:"Student updated successfully"});
    }catch(error){
        console.log(error);
        res.status(500).json({message : "INTERNAL SERVER ERROR"});

    }
}

//delete student in db
const deleteStudentById =async (req,res) =>{
    try{
    const {id}=  req.params;

    const results = await pool.query(queries.deleteStudentQuery,[id]);

    console.log(results.rows[0]);
    res.status(200).json({message:"Student deleted successfully"});
    }catch(error){
        console.log(error);
        res.status(500).json({message : "INTERNAL SERVER ERROR"});

    }
}

module.exports = {
    getAllStudents,
    getStudentById,
    createStudent,
    updateStudent: updateStudentById,
    deleteStudentById

}