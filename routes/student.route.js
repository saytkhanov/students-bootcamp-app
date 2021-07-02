const {Router} = require('express');
const router = Router();
const {postStudent, getAllStudents, getStudentById, deleteStudent, patchStudent} = require('../controllers/student.controller')


router.get('/', getAllStudents);
router.post('/:id', postStudent);
router.get('/student/:id', getStudentById);
router.delete('/student/:id', deleteStudent);
router.patch('/student/:id', patchStudent);

module.exports = router