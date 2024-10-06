import React, { useCallback, useEffect, useState } from 'react'
import './Todo.css'
import TodoForm from './TodoForm.js';
import Todo from './Todo.js'
import { handleError, handleSuccess } from '../Components/util.js';
import { EditTodoForm } from './EditTodoForm.js';
import UserInfo from './UserInfo.js';

function TodoWrapper() {
    const [todos,setTodos]=useState([]);

    const addToDos=(todo)=>{
        setTodos([...todos,todo])
        console.log("Rohit checking",todo,todos)
    }
  
    async function  getAllTask () {
      try {
        const id=localStorage.getItem('userId')
        const url = `http://localhost:8080/api/tasks/myTask/${id}`;

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "content-type": "application/json",
          }
        });
        const result = await response.json();
        const resultEditable=result.map((todo)=>{
          return {...todo,isEditing:false}
        })
        setTodos(resultEditable)
        console.log("rohit editable",)
        console.log(result)
      } catch (err) {
        handleError(err);
      }
    };

    useEffect(()=>{
      getAllTask()
    },[])

    const deleteTodo = async (id) => 
    {
        const userId=localStorage.getItem("userId")
        try {
          const url = `http://localhost:8080/api/tasks/${id}/${userId}`;
  
          const response = await fetch(url, {
            method: "DELETE",
            headers: {
              "content-type": "application/json",
            }
          });
          const result = await response.json();
          handleSuccess("Task deleted successfully")
          getAllTask()
          console.log(result)
        } catch (err) {
          handleError(err);
        }
    }
      // setTodos(todos.filter((todo) => todo.id !== id));

    const toggleComplete = async(id) => {
      const filteredData=todos.map((todo)=>{
        return todo._id === id ? { ...todo, completed: !todo.completed } : todo
       })
      setTodos(filteredData);
    
      console.log("filter data",filteredData)
      const userId=localStorage.getItem("userId")
      const dataChanged=filteredData.filter((todo)=>{
        return todo._id==id
      })
      console.log("dataChanged checked",dataChanged[0])
      
      const taskdata={
        title:dataChanged[0].title,
          completed:dataChanged[0].completed
      }
      try {
        const url = `http://localhost:8080/api/tasks/${id}/${userId}`;

        const response = await fetch(url, {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(taskdata),
        });
        const result = await response.json();
        handleSuccess(`${dataChanged[0].title} is ${dataChanged[0].completed?'completed':'pending'}`)
        getAllTask()
        console.log(result)
      } catch (err) {
        handleError(err);
      }

     
    }
  
    const editTodo = (id) => {
      console.log("editToDo",id,todos)
      setTodos(
        todos.map((todo) =>
          todo._id === id ? { ...todo, isEditing: !todo.isEditing } : todo
        )
      );
    }
    
    const editTask = async(task, id) => {
      console.log("editTask",todos,task)
      setTodos(
        todos.map((todo) =>
          todo._id === id ? { ...todo, title:task, isEditing: !todo.isEditing } : todo
        )
      );
    
      const userId=localStorage.getItem("userId")
      
      const taskdata={
        title:task
      }
      try {
        const url = `http://localhost:8080/api/tasks/${id}/${userId}`;

        const response = await fetch(url, {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(taskdata),
        });
        const result = await response.json();
        handleSuccess("Updated Successfully")
        getAllTask()
        console.log(result)
      } catch (err) {
        handleError(err);
      }

    };


  return (
    <div className='TodoWrapper'>
        <UserInfo />
        <TodoForm addToDos={addToDos}/>
        {/* {todos!=null && todos!=undefined && todos.length>0?todos.map((task)=>{
        return <Todo  
        task={task} 
        key={task.id}
        deleteTodo={deleteTodo}
        editTodo={editTodo}
        toggleComplete={toggleComplete}/>
        }):""} */}
         {todos.map((todo, index) => (
            todo.isEditing ? (
                <EditTodoForm editTodo={editTask} task={todo} />
            ) : (
                <Todo task={todo} key={index} toggleComplete={toggleComplete} deleteTodo={deleteTodo} editTodo={editTodo} />
            )
            
        ))}
    </div>
  )
}

export default TodoWrapper