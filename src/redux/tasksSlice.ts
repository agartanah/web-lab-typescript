import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TaskType, TasksState } from '../types';

const initialState: TasksState = {
  openTask: 0,
  currTask: null,
  currOperation: '',
  listTasks: [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setOpenTask(state, action: PayloadAction<number>) {
      state.openTask = action.payload;
    },
    setCurrTask(state, action: PayloadAction<TaskType | null>) {
      state.currTask = action.payload;
    },
    setCurrOperation(state, action: PayloadAction<string>) {
      state.currOperation = action.payload;
    },
    setListTasks(state, action: PayloadAction<TaskType[]>) {
      state.listTasks = action.payload;
    },
  },
});

export const {
  setOpenTask,
  setCurrTask,
  setCurrOperation,
  setListTasks,
} = tasksSlice.actions;

export default tasksSlice.reducer;
