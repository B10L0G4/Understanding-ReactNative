import FirstComponet from './components/FirstComponentes';
import './App.css';
import {useState,useEffect } from "react";
import {BsTrash ,BsBookmarkCheck, BsBookmarkCheckFill} from "react-icons/bs"

const API = "http://localhost:5000";
function App() {
  const [title, setTitle] = useState("")
  const [time, setTime] = useState("")
  const [todos,setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

useEffect(()=> {
  const loadData = async()=>{
    setLoading(true)
    const res = await fetch(API + "/todos")
    .then((res)=>res.json())
    .then((data)=> data)
    .catch((err)=> console.log(err));

    setLoading(false);
    setTodos(res);
  };
  //loadData();
});



const handleSubmit = async (e) => {
  e.preventDefault();
  const todo = {
    id : Math.random(),
    title,
    time,
    done:false,
  };
  await fetch(API + "/todos", {
    method: "POST",
    body :JSON.stringify(todo),
    headers: {
      "Content-Type": "application/json",
    },
  });

  setTodos((prevState) => [...prevState, todo]);
  setTitle("");
  setTime("");
};
if(loading){
  return <p>Carregando ...</p>
}

const handleDelete = async (id) => {
  await fetch(API + "/todos" + id, {
    method: "DELETE"
  });
  setTodos((prevState) => prevState.filter((todo)=> todo.id !== id));

}

  return (
    <div className="App">
      <div className="todo-header">
        <h1>React To-Do</h1>
        <FirstComponet> </FirstComponet>
      </div>
      <div className="form-todo">
        <p>Insira a sua proxima tarefa </p>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor='time'>Duração: </label>
            <input 
            type="text" 
            name="time"
            placeholder="Tempo estimado " 
            onChange = {(e) => setTime(e.target.value)}
            value = {time} 
            required
            />
          </div>
          <div className="form-control">
            <label htmlFor='title'>O que vc vai fazer</label>
            <input 
            type="text" 
            name="title"
            placeholder="Titulo da Tarefa" 
            onChange = {(e) => setTitle(e.target.value)}
            value = {title} 
            required
            />
          </div>
          <input type="submit" value="Criar tarefa "/>
        </form>
      </div>
      <div className="list-todo">
        <h2>Lista de Tarefas </h2>
        {todos.length === 0 && <p>Não há tarefas</p>}
        {todos.map((todo)=> (
          <div className='todo' key={todo.id}>
          <h3 className={todo.done ? "todo-done": ""}>{todo.title}</h3>
          <p>Duração: {todo.time}</p>
          <div className='actions'>
            <span onClick={() => handleEdit}>
              {!todo.done ? <BsBookmarkCheck/> : <BsBookmarkCheckFill/>}
            </span>
            <BsTrash onClick={()=>{handleDelete(todo.id)}}/>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}
export default App;
