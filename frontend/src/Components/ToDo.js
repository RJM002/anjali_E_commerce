import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./Todo.css";
import { Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { handleError, handleSuccess } from "./util";

function ToDo() {
    const [task,setTask]=useState("");

    const setValue=(e)=>{
        setTask(e.target.value);
    }
    const addTask=async()=>{
        if(task.length<=3){
            handleError("task length should be more than 3")
        }else{
            const newTask={
                title:task,
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
          
                const { success, message, error } = result;
                if (success) {
                  handleSuccess(message);
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
    <>
      <div className="todoContainer">
        <div>ToDo</div>
        <Box sx={{ width: 500, maxWidth: "100%" }}>
          <TextField onChange={setValue} fullWidth label="To Do" id="fullWidth" />
          <div className="rightPosition">
          <Button onClick={addTask} ><AddIcon fontSize="small" />Add</Button>
          </div>
        </Box>
        <div className="showToList">
        </div>
      </div>
    </>
  );
}

export default ToDo;
