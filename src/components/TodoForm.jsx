import { useRef } from 'react'

const TodoForm = ({addTodo}) => {
    const refName = useRef()
    const refCategory = useRef()

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!refName || !refCategory) return;
        addTodo(refName?.current?.value, refCategory?.current?.value)
    }

  return (
    <div className="todo-form">
        <h2>Criar Tarefa:</h2>
        <form onSubmit={handleSubmit}>
            <input 
            ref={refName}
            type="text" 
            placeholder='Digite o título' 
            />
            <select ref={refCategory}>
                <option value="">Selecione uma categoria</option>
                <option value="Trabalho">Trabalho</option>
                <option value="Pessoal">Pessoal</option>
                <option value="Estudos">Estudos</option>
            </select>
            <button type="submit">Criar tarefa</button>
        </form>
    </div>
  )
}

export default TodoForm