export interface TaskType {
    id: number;
    title: string;
    description: string;
    isPin: boolean;
}

export interface TasksState {
    openTask: number;
    currTask: TaskType | null;
    currOperation: string;
    listTasks: TaskType[];
}