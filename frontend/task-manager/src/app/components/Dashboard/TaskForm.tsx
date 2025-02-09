import { useState } from "react";
import { createTask } from "@/features/auth/redux/taskSlice";
import { AppDispatch } from "@/redux/store";

interface TaskFormProps {
  dispatch: AppDispatch;
}

export default function TaskForm({ dispatch }: TaskFormProps) {
  const [newTask, setNewTask] = useState({ title: "", description: "", dueDate: "", category: "work" });

  const handleCreateTask = () => {
    if (newTask.title && newTask.description) {
      dispatch(createTask(newTask));
      setNewTask({ title: "", description: "", dueDate: "", category: "work" });
    }
  };

  return (
    <div className="bg-gray-600 p-4 shadow rounded mb-4 ">
      <h2 className="text-xl font-semibold mb-2">Create New Task</h2>

      <div className="flex flex-col md:flex-row justify-between gap-2 w-full mb-3 ">
      <input
        type="text"
        placeholder="Task Title"
        value={newTask.title}
        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        className="p-2 border border-gray-700 rounded-md w-full bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />

      <select
        value={newTask.category}
        onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
        className="p-2 border border-gray-700 rounded-md w-full md:w-[20%] bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        <option value="work">Work</option>
        <option value="personal">Personal</option>
        <option value="urgent">Urgent</option>
        <option value="other">Other</option>
      </select>
      </div>


      <textarea
        placeholder="Task Description"
        value={newTask.description}
        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        className="p-2 border border-gray-700 rounded-md w-full mb-2 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <input
        type="date"
        value={newTask.dueDate}
        onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
        className="p-2 border border-gray-700 rounded-md w-full mb-2 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />

      <button onClick={handleCreateTask} className="bg-purple-500 text-white p-2 rounded ">
        Add Task
      </button>
    </div>
  );
}
