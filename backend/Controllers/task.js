const Task = require("../Models/Task.js")

 const createTask=async(req,res,next)=>{
    try{
        const newTask=new Task({
            title:req.body.title,
            user:req.body.id,
            completed:req.body.completed
        })
        const savedTask=await newTask.save()
        return res.status(200).json({data:savedTask,message:"task created successfully",success:true})
    }catch(err){
        return next(err)
    }
}

 const getAllTask=async(req,res,next)=>{
    try{
        const tasks=await Task.find({});
        return res.status(200).json(tasks)
    }catch(err){
        return next(err)
    }

}

 const getCurrentUserTask=async(req,res,next)=>{
    try{
        const getTask=await Task.find({
            user:req.params.id
        })
        return res.status(200).json(getTask)
    }catch(err){
        return next(err)
    }
}

 const updateTask= async(req,res,next)=>{
    try{
        const task= await Task.findById(req.params.taskId).exec();
        if(!task){
            return res.status(404).json({message:"No Task Found"});
        }
        if(task.user.toString()!==req.params.userId){
            return res.status(401).json({message:"not authorized to create task"})
        }
        const updatedTask=await Task.findByIdAndUpdate(req.params.taskId,{
            title:req.body.title,
            completed:req.body.completed
        },{new:true});
        
        return res.status(200).json(updatedTask)
    }catch(err){
        return next(err)
    }
}

 const deleteTaskById=async(req,res,next)=>{
    try{

        const task= await Task.findById(req.params.taskId).exec();
        if(!task){
            return res.status(404).json({message:"No Task Found"});
        }
        if(task.user.toString()!==req.params.userId){
            return res.status(401).json({message:"not authorized to delete task"})
        }
        await Task.findByIdAndDelete(req.params.taskId);
        return res.status(200).json({message:"task deleted successfully"});

    }catch(err){
        return next(err)
    }
}

module.exports = {
    createTask,
    getAllTask,
    getCurrentUserTask,
    deleteTaskById,
    updateTask
  };