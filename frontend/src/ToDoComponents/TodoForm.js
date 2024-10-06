import React, { useState } from 'react'
import { handleError, handleSuccess } from '../Components/util';

function ToDoForm({addToDos}) {
    const [value,setValue]=useState("");

    const onChange=(e)=>{
        setValue(e.target.value);
    }
 

    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(value.length<=3){
            handleError("task length should be more than 3")
        }else{
            const newTask={
                title:value,
                id:localStorage.getItem("userId")
            }
            try {
                const url = "http://localhost:8080/api/tasks/";
                const response = await fetch(url, {
                    method: "POST",
                    headers: {
                    "content-type": "application/json",
                  },
                  body: JSON.stringify(newTask),
                });
                const result = await response.json();
                
                let { success, message, error,data } = result;

                data={...data,isEditing:false}
                
                if (success) {
                    handleSuccess(message);
                    addToDos(data)
                    setValue("")
                } else if (error) {
                    const details = error?.details[0]?.message;
                  handleError(details);
                } else if (!success) {
                  handleError(message);
                }
                console.log("ROHIT result", result);
              } catch (err) {
                handleError(err);
              }
        }

    }
  return (
    <form className='TodoForm' onSubmit={handleSubmit}>
        <input value={value} onChange={(e)=>{onChange(e)}} type='text' className='todo-input' placeholder='Todo Task'></input>
        <button type='submit' className='todo-btn'>Add Task</button>
    </form>
  )
}

export default ToDoForm