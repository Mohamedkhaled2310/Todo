"use client";

import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "@/features/auth/redux/taskSlice";
import { logoutUser } from "@/features/auth/redux/authSlice"; 
import { RootState, AppDispatch } from "@/redux/store";
import TaskForm from "../components/Dashboard/TaskForm";
import TaskFilter from "../components/Dashboard/TaskFilter";
import TaskList from "../components/Dashboard/TaskList";
import { Task } from "@/utils/types";
import Header from './../components/Header/Header';
import { useRouter } from "next/navigation";
import withAuth from "../hoc/withAuth";

 const Dashboard = ()=> {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, loading } = useSelector((state: RootState) => state.task);
  const [filter, setFilter] = useState("");
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const router = useRouter();

  
  useEffect(() => {
    dispatch(fetchTasks({ category: filter }));
  }, [dispatch]);

  const filteredTasks = useMemo(() => {
    return filter
      ? tasks.filter((task: Task) => task.category.toLowerCase() === filter.toLowerCase())
      : tasks;
  }, [tasks, filter]);

  const handleLogout = async () => {
    await dispatch(logoutUser()).unwrap();
    router.push("/");
  };

  return (
    <>
    <Header onLogout={handleLogout} />
    <div className="p-6 bg-gray-800 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Task Dashboard</h1>
      <TaskForm dispatch={dispatch} />
      <TaskFilter filter={filter} setFilter={setFilter} />
      <TaskList tasks={filteredTasks} loading={loading} dispatch={dispatch} editingTask={editingTask} setEditingTask={setEditingTask} />
    </div>
    </>
  );
}
export default withAuth(Dashboard);