import React, { useRef } from 'react';
import { IoIosClose } from 'react-icons/io';
import { IoCheckmarkSharp } from 'react-icons/io5';
import { LuPencil } from "react-icons/lu";



const Todo = ({todo, removeTodo, completeTodo, isLoading, updateTodo, isEdit, setIsEdit}) => {
  const refName = useRef()

  function handleUpdateTodo() {
    return updateTodo(refName?.current?.value)
  }

  return (
    <div className="todo" style={{textDecoration: todo.check ? "line-through" : ""}}>
      <div className="content">
        <div className='content-input-update'>
          {isEdit && <input 
            ref={refName}
            type="text" 
            placeholder='Digite o título' 
          />}
          {isEdit &&   <button disabled={isLoading} className="complete button-action" title='Concluir Item' onClick={handleUpdateTodo}>
            <IoCheckmarkSharp size={20} />
          </button>}
        

        </div>

        
        {!isEdit &&  <p>{todo.name}</p>}
      
        {/* <p className="category">
            ({todo.category})
        </p> */}
      </div>
      <div className='container-buttons'>
        <button onClick={() => setIsEdit(prev => !prev)} disabled={isLoading || todo?.check} className="edit button-action" title='Concluir Item'>
          <LuPencil size={20}/>
        </button>
        <button disabled={isLoading} className="complete button-action" title='Concluir Item' onClick={completeTodo}>
          <IoCheckmarkSharp size={20}/>
        </button>
        <button disabled={isLoading} className="remove button-action" title='Excluir Item' onClick={removeTodo}>
          <IoIosClose size={24}/>
        </button>
      </div>
    </div>
  )
}

export default Todo