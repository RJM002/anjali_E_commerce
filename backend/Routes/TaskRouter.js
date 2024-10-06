const express=require('express');
const { createTask, deleteTaskById, getAllTask, getCurrentUserTask, updateTask } = require('../Controllers/task.js');

const router=express.Router();

router.post('/',createTask);
router.get('/getAllTask',getAllTask);
router.get('/myTask/:id',getCurrentUserTask);
router.put('/:taskId/:userId',updateTask);
router.delete('/:taskId/:userId',deleteTaskById);


module.exports=router;