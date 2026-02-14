import { ChevronRightIcon, TrashIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Tasks({tasks,onTaskClick,onDeleteClick}) {
    const navigate = useNavigate()

    function onSeeDetailsClick(task) {
        const query = new URLSearchParams()
        query.set("title" , task.title)
        query.set("description" , task.description)
        navigate(`/task?${query.toString()}`) //utilizando queryparams pra poder mostrar os dados da página que ele irá navegar
    }

    return (
    <ul className="space-y-4 p-6 bg-slate-200 rounded-md shadow">
        {tasks.map((task) => ( //.map que faz o trabalho de renderização do atributo "titulo" do objeto e transforma em uma li 
        <li key={task.id} className="flex gap-2">
            <button onClick={() => onTaskClick(task.id)} 
            className={`bg-slate-400 text-left w-full text-white p-2 rounded-md transition-all duration-500 ${
            task.isCompleted ? 'line-through opacity-60' : ''}`}>
                {task.title}
            </button>
            <button onClick={() => onSeeDetailsClick(task)} className="bg-slate-400 p-2 rounded-md text-white">
                <ChevronRightIcon />
            </button>
            <button onClick={() => onDeleteClick(task.id)}
            className="bg-slate-400 p-2 rounded-md text-red-600">
                <TrashIcon />
            </button>
        </li>
    ))}
    </ul>
    );
}

export default Tasks