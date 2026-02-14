import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import {v4} from "uuid";
import Title from "./components/Title";

function App() {

  const [tasks,setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
);

//armazenando os dados localmente

 useEffect(() => {
  localStorage.setItem("tasks", JSON.stringify(tasks))

 }, [tasks])

  function onTaskClick(taskId) {
    const newTasks = tasks.map((task) => {
      //É NECESSÁRIO ATUALIZAR ESSA TAREFA
      if (task.id === taskId) {
        return {...task, isCompleted: !task.isCompleted}
      }

      //NÃO PRECISO ATUALIZAR ESSA TAREFA
      return task
    });

    setTasks(newTasks);
  }

  function onDeleteClick(taskId) {
    const newTasks = tasks.filter(task => task.id != taskId)
    setTasks(newTasks)
  }

  function onAddTaskSubmit (title, description) {
    const newTask = {
      id: v4(),
      title, // como o nome da propriedade é o mesmo nome do parâmetro, está ok em deixar só assim
      description,
      isCompleted: false,
    };
    setTasks([...tasks, newTask])
    console.log("tarefa foi adicionada")
  }

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <Title>Gerenciador de Tarefas</Title>
        <AddTask onAddTaskSubmit={onAddTaskSubmit}/>  
        <Tasks tasks={tasks} onTaskClick={onTaskClick} onDeleteClick={onDeleteClick} />
      </div>
    </div>
  )
}

export default App
