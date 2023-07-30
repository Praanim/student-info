const getAllStudentsQuery= "SELECT * FROM student";
const getStudentByIdQuery = `SELECT * FROM student WHERE id = $1`;
const getStudentByEmailQuery = `SELECT * FROM student WHERE email = $1`;

const createStudentQuery = `INSERT INTO student(name,email,age,college,dob) values (
    $1,
    $2,
    $3,
    $4,
    $5
    )
    RETURNING id,
    name,
    email,age,
    college,dob;
    `;


const updateStudentQuery = `UPDATE student SET name = $1 ,
    email = $2,age= $3,college = $4, dob = $5
    WHERE id = $6;
`;    

const deleteStudentQuery = `DELETE FROM student WHERE  id = $1`;

module.exports ={
    getAllStudentsQuery,
    getStudentByIdQuery,
    createStudentQuery,
    updateStudentQuery,
    deleteStudentQuery,
    getStudentByEmailQuery
}