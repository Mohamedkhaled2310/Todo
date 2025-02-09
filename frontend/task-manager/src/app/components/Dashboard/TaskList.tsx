import TaskItem from "./TaskItem";
import { Task } from "@/utils/types";
import { AppDispatch } from "@/redux/store";

interface TaskListProps {
  tasks: Task[];
  loading: boolean;
  dispatch: AppDispatch;
  editingTask: Task | null;
  setEditingTask: (task: Task | null) => void;
}

export default function TaskList({ tasks, loading, dispatch, editingTask, setEditingTask }: TaskListProps) {
  return (
    <div className="space-y-4">
      {loading ? (
        <p className="text-center text-gray-500 font-bold">Loading tasks...</p>
      ) : (
        tasks.map((task) => (
          <TaskItem
            key={task._id}
            task={task}
            dispatch={dispatch}
            editingTask={editingTask}
            setEditingTask={setEditingTask}
          />
        ))
      )}
    </div>
  );
}
