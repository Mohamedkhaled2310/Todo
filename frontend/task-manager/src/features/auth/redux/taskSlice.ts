import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/utils/axiosInstance";
import { Task } from "@/utils/types";


interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};


export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async ({ category }: { category?: string} = {}, { rejectWithValue }) => {
    try {
      const response = await api.get("/tasks", {
        params: { category },
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch tasks");
    }
  }
);

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (taskData: any, { rejectWithValue }) => {
    try {
      const response = await api.post("/tasks", taskData, { withCredentials: true });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to create task");
    }
  }
);


export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ taskId, taskData }: { taskId: string; taskData: any }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/tasks/${taskId}`, taskData, { withCredentials: true });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to update task");
    }
  }
);


export const toggleTaskCompletion = createAsyncThunk(
  "tasks/toggleTaskCompletion",
  async ({ taskId, completed }: { taskId: string; completed: boolean }, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `/tasks/${taskId}`,
        { completed: !completed }, // Toggle completion status
        { withCredentials: true }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to toggle task completion");
    }
  }
);


export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId: string, { rejectWithValue }) => {
    try {
      await api.delete(`/tasks/${taskId}`, { withCredentials: true });
      return taskId;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete task");
    }
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.loading = false;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.map((task) =>
          task._id === action.payload._id ? action.payload : task
        );
      })
      .addCase(toggleTaskCompletion.fulfilled, (state, action) => {
        state.tasks = state.tasks.map((task) =>
          task._id === action.payload._id ? action.payload : task
        );
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
      });
  },
});

export default taskSlice.reducer;