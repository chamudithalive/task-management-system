import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Assignee {
  id: number;
  name: string;
  image: string;
}

export interface Task {
  id: number;
  name: string;
  description: string;
  dueDate: string;
  priority: "Low" | "Medium" | "High"|null;
  status: "Todo" | "In Progress" | "Completed";
  assignee: Assignee | null;
}

export interface TaskState {
  tasks: Task[];
  assignees: Assignee[];
}

const initialState: TaskState = {
  tasks: [],
  assignees: [
    { id: 1, name: "Alice", image: "alice.png" },
    { id: 2, name: "Bob", image: "bob.png" },
  ],
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<Task>) {
      state.tasks.push(action.payload);
    },
    updateTaskStatus(
      state,
      action: PayloadAction<{
        id: number;
        status: "Todo" | "In Progress" | "Completed";
      }>
    ) {
      const task = state.tasks.find((task) => task.id === action.payload.id);
      if (task) {
        task.status = action.payload.status;
      }
    },
    deleteTask(state, action: PayloadAction<number>) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    updateTask(state, action: PayloadAction<Task>) {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
  },
});

export const { addTask, updateTaskStatus, deleteTask, updateTask } =
  taskSlice.actions;

export default taskSlice.reducer;
