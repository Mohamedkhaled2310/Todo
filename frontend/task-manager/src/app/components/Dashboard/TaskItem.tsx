import { toggleTaskCompletion, deleteTask, updateTask } from "@/features/auth/redux/taskSlice";
import { Task } from "@/utils/types";
import { AppDispatch } from "@/redux/store";

interface TaskItemProps {
  task: Task;
  dispatch: AppDispatch;
  editingTask: Task | null;
  setEditingTask: (task: Task | null) => void;
}

export default function TaskItem({ task, dispatch, editingTask, setEditingTask }: TaskItemProps) {
  const isEditing = editingTask && editingTask._id === task._id;

  const handleUpdateTask = () => {
    if (editingTask) {
      dispatch(updateTask({ taskId: editingTask._id, taskData: editingTask }));
      setEditingTask(null);
    }
  };

  return (
  <div className={`${task.completed ? "opacity-50" : "opacity-100"} bg-gray-600 p-4 shadow rounded border-gray-600 flex justify-between items-center`}>
      {isEditing ? (
        <div className="w-full">
          <input
            type="text"
            value={editingTask.title}
            onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
            className="p-2 border border-gray-600 rounded-md w-full mb-2 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <textarea
            value={editingTask.description}
            onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
            className="p-2 border border-gray-600 rounded-md w-full bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <select
            value={editingTask.category}
            onChange={(e) => setEditingTask({ ...editingTask, category: e.target.value })}
            className="p-2 border border-gray-600 rounded-md w-full mb-2 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="work">Work</option>
            <option value="personal">Personal</option>
            <option value="urgent">Urgent</option>
            <option value="other">Other</option>
          </select>
          <button onClick={handleUpdateTask} className="bg-green-500 text-white p-2 rounded-md mt-2">
            Save Changes
          </button>
          <button onClick={() => setEditingTask(null)} className="bg-red-500 text-white p-2 rounded-md mx-3">
              Cancel
          </button>
        </div>
      ) : (
        <>
          <div>
            <h3 className="text-lg font-semibold">{task.title}</h3>
            <p className="">{task.description}</p>
            <p className="text-sm">Due: {task.dueDate}</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setEditingTask(task)} className="text-yellow-500">
              ✏️ Edit
            </button>
            <button
              onClick={() => dispatch(toggleTaskCompletion({ taskId: task._id, completed: task.completed }))}
              className="text-green-500"
            >
              {task.completed ? "❌" : "✔️"}
            </button>
            <button
              onClick={() => dispatch(deleteTask(task._id))}
              className="text-red-500"
            >
              🗑️
            </button>
          </div>
        </>
      )}
    </div>
  );
}
