import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

function App() {
  const [todo, settodo] = useState("");
  const [todos, settodos] = useState([])
  const [showFinsished, setshowFinsished] = useState(true)
  useEffect(() => {
  let todoString = localStorage.getItem("todos")
  if(todoString){
    let todos = JSON.parse(localStorage.getItem("todos"))
    settodos(todos)
    }
  }, [])
  
  const SaveTols = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }
  const toggleFinished = (params) => {
    setshowFinsished(!showFinsished)
  }
  const handleEdit = (e, id, todoval)=>{
    let newtodo = todos.filter(item=>{
      return item.id === id;
    })
    // console.log(newtodo)
    settodo(newtodo[0].todo)
    // settodo(todoval)
    let newtodos = todos.filter(item=>{
      return item.id != id;
    });
    settodos(newtodos)
    SaveTols()
  }
  const handleDelete = (e, id)=>{
    let c= confirm("Confirmation");
    if(c){
      // console.log(`The id is ${id}`)
      let newtodos = todos.filter(item=>{
        return item.id != id;
      });
      settodos(newtodos)
      SaveTols()
    }
    }
  const handleChange = (e)=>{
    settodo(e.target.value)
  }
  const handleCheckbox = (e) => {
    let id = e.target.name 
    // console.log(id)
    let index = todos.findIndex(item=>{
      return item.id === id;
    })
    // console.log(index)
    let newtodos = [...todos];
    // newtodos eik new array bne gi 
    // let newtodos = todos; krne se same reference rhe ga or agr reference change ni hoga to ye state rerender ni hogi
    console.log( newtodos[index].isCompleted)
    newtodos[index].isCompleted = !(newtodos[index].isCompleted)
    settodos(newtodos)
    SaveTols()
  }
  
  function Addingdata(){
    if(todo!=""){
      settodos([...todos, {id: uuidv4(), todo, isCompleted: false}]) // Adds a new todo object to the todos array
      settodo("") // Resets the todo input field to empty string
      console.log(todos)
    }
      // It logs the current todos array to the console (though note that due to React's asynchronous nature of state updates, console.log(todos) inside handleAdd may not log the updated state immediately after settodos).
      SaveTols()
  }
  const handleAdd = ()=>{
    Addingdata();
  }
  const handleKeyDown = (event)=>{
    if (event.key === "Enter") {
    Addingdata();
  }
  }
  return (
    <>
    <Navbar/>
    <div className="mx-3 container md:mx-auto bg-violet-100 rounded-xl p-5 my-5 min-h-[80vh] md:w-1/2">
      <h1 className='font-bold text-gray-900 text-center md:text-3xl text-2xl'>FTask Manager to manage your todos</h1>
      <div className="addtodo my-5 flex flex-col gap-4">
        <h2 className='text-xl font-bold'>Add Todo</h2>
        <input onKeyDown={handleKeyDown} onChange={handleChange} value={todo} type="text" className='w-full rounded-full px-3 py-1 border border-violet-600 focus:border-violet-800 border-y-2 border-x-2 focus:outline-none' />
        <button onClick={handleAdd} disabled={todo.length<=3} className='bg-violet-800 hover:bg-violet-900 p-2 py-2 text-sm font-bold text-white rounded-full cursor-pointer'>Save</button>
      </div>
      <input className='my-4' id='show' onChange={toggleFinished} type="checkbox" checked={showFinsished} /> 
     <label htmlFor="show"> Show Finished</label>
     <hr className='h-[1px] bg-gray-400 outline-none border-none opacity-65 my-2 w-[90%] mx-auto' />
        <h2 className='text-xl font-bold'>Todos Here</h2>
        <div className="todos">
          {todos.length === 0 && <div className='my-5 font-bold'> No tasks to diplay here</div>}
          {todos.map(item=>{
            return (showFinsished || !item.isCompleted)&& <div key={item.id} className="todo flex justify-between my-3">
              <div className='flex gap-5'>
            <input onChange={handleCheckbox} type="checkbox" name = {item.id} checked={item.isCompleted} />
            <div key={item.id} className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
            <div className="buttons flex h-full">
              <button onClick={(e)=>handleEdit(e, item.id, item.todo)} className='bg-violet-800 hover:bg-violet-900 p-2 py-1 mx-1 text-lg font-bold text-white rounded-md'><CiEdit /></button>
              <button onClick={(e)=>handleDelete(e,item.id)} className='bg-violet-800 hover:bg-violet-900 p-2 py-1 mx-1 text-lg font-bold text-white rounded-md'><MdDelete /></button> 
            </div>
          </div>
          })}
        </div>
    </div>
    </>
  )
}

export default App
