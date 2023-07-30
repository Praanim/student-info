const {Router} = require('express');
const controller = require("./controller");

const router = Router();

router.get('/',controller.getAllStudents);
//parameter ma id pass gareko
router.get('/:id',controller.getStudentById);
router.post('/',controller.createStudent);
router.put('/:id',controller.updateStudent);
router.delete('/:id',controller.deleteStudentById);




module.exports = router;