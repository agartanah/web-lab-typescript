export interface TaskType {
    id: number;
    title: string;
    description: string;
    isPin: boolean;
}

export interface TaskElementType {
    id: number;
    title: HTMLParagraphElement;
    description: HTMLParagraphElement;
}

export interface TasksState {
    openTask: number;
    currTask: TaskType | null;
    currOperation: string;
    listTasks: TaskType[];
}