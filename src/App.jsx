
import "./App.css";

import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from "react";
import Todo from './components/Todo';
import TodoForm from './components/TodoForm';
import { apiDelete, apiGet, apiPatch, apiPost } from './config/api';

function App() {
  const [isEdit, setIsEdit] = useState(false)

  const { data: todoList, isPending: isLoadingTodoList, refetch: refetchTodoList} = useQuery({
    queryKey: [
      'todos',
    ],
    queryFn: () =>
      apiGet('')
  })

  const { mutateAsync: removeTodoApi, isPending: isPedingTodoDelete } = useMutation({
    mutationKey: ['delete'],
    mutationFn: async(id) => {
      await apiDelete(`/${id}`)
    },
    onSuccess: () => {
      refetchTodoList()
    }
  })

  const { mutateAsync: createTodoApi, isPending: isPedingTodoCreate } = useMutation({
    mutationKey: ['create-todo'],
    mutationFn: async ({name, moment, category}) => {
      await apiPost('/create', { name, moment, category, check: false })
    },
    onSuccess: () => {
      alert('Todo criado com sucesso!')
      refetchTodoList()
    }
  })

  const { mutateAsync: updateTodoApi, isPending: isPedingTodoUpdate } = useMutation({
    mutationKey: ['update-todo'],
    mutationFn: async ({id, todo}) => {
      await apiPatch(`/${id}`, { check: !todo?.check }) 
    },
    onSuccess: () => {
      alert('Todo atualizado com sucesso')
      refetchTodoList()
    }
  })

  const { mutateAsync: updateTodoNameApi, isPending: isPedingTodoUpdateName } = useMutation({
    mutationKey: ['update-todo-name'],
    mutationFn: async ({ id, name }) => 
      await apiPatch(`/${id}`, { name }),
    onSuccess: () => {
      alert('Todo atualizado com sucesso')
      setIsEdit(false)
      refetchTodoList()
    }
  })

  const addTodo = (name, category) => {
    createTodoApi({name, moment: new Date(), category})
  }

  const removeTodo = (id) => {
    if (!id) return

    removeTodoApi(id)
  }

  const completeTodo = (id, todo) => {
    updateTodoApi({ id, todo })
  }

  function handleUpdate(id, name) { 
    console.log('id', id)
    console.log('name', name)

    updateTodoNameApi({id, name})
  }

  return <div className="app">
    <h1>Lista de Tarefas</h1>
    <div className="todo-list">
      {isLoadingTodoList && <p className="loading">Carregando...</p>}
      {!isLoadingTodoList && todoList?.map((todo) => (
        <Todo 
          key={todo?._id}
          todo={todo} 
          removeTodo={() => removeTodo(todo?._id)} 
          completeTodo={() => completeTodo(todo?._id, todo)} 
          updateTodo={(name) => handleUpdate(todo?._id, name)}
          isLoading={isPedingTodoDelete || isPedingTodoCreate || isPedingTodoUpdate || isPedingTodoUpdateName} 
          isEdit={isEdit}
          setIsEdit={setIsEdit}
        /> 
      ))}
    </div>
    <TodoForm addTodo={addTodo}/>
  </div>
}

export default App
