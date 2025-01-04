import { TaskType } from "../types";

function setTaskToLocalStorage(taskId: number, taskTitle: string, taskDescription: string, isPin: boolean = false): TaskType[] {
  const tasks: TaskType[] = JSON.parse(localStorage.getItem("tasks") || "[]");
  console.log(isPin);
  if (hasKey(taskId)) {
    tasks.forEach((item) => {
      if (item.id === taskId) {
        item.title = taskTitle;
        item.description = taskDescription;
        item.isPin = isPin;
      }
    });
  } else {
    const newTask: TaskType = {
      id: taskId,
      title: taskTitle,
      description: taskDescription,
      isPin: isPin
    };

    tasks.push(newTask);
  }

  localStorage.setItem("tasks", JSON.stringify(tasks));

  return readLocalStorage();
}

function readLocalStorage(): TaskType[] {
  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

  if (!Array.isArray(tasks)) {
    return [];
  }

  return tasks
    .map((task: TaskType) => ({
      id: task.id,
      title: task.title,
      description: task.description,
      isPin: task.isPin
    }))
    .sort((a, b) => b.id - a.id); // Сортируем по убыванию id
    // .reduce<TaskType[]>((acc, task) => {
    //   // Разделяем задачи на закрепленные и остальные
    //   if (task.isPin && acc.filter(t => t.isPin).length < 3) {
    //     return [task, ...acc];
    //   }
    //   return [...acc, task];
    // }, []);
}


function deleteTaskFromLocalStorage(taskId: number): TaskType[] {
  const tasks: TaskType[] = JSON.parse(localStorage.getItem("tasks") || "[]");

  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);

    for (let i = taskIndex; i < tasks.length; i++) {
      tasks[i].id -= 1;
    }

    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  return readLocalStorage();
}

function shift(id: number, newId: number, listTasks: TaskType[], isPin: boolean = false): TaskType[] | void {
  let array: TaskType[] = [...listTasks].reverse();

  console.log(listTasks);

  if (!array.length) {
    return;
  }

  let subArray: TaskType[];

  if (id > newId) {
    subArray = array.slice(newId - 1, id);

    subArray = [subArray[subArray.length - 1], ...subArray];
    subArray.splice(subArray.length - 1, 1);

    subArray = subArray.map((task, index) => ({
      ...task,
      id: newId + index,
    }));

    array.splice(newId - 1, id - newId + 1, ...subArray);
  }

  if (id < newId) {
    subArray = array.slice(id - 1, newId);

    subArray = [...subArray, subArray[0]];
    subArray.splice(0, 1);

    subArray = subArray.map((task, index) => ({
      ...task,
      id: id + index,
    }));

    array.splice(id - 1, newId - id + 1, ...subArray);
  }

  array.forEach((item) => {
    if (item.id == newId) {
      setTaskToLocalStorage(item.id, item.title, item.description, isPin);
    } else {
      setTaskToLocalStorage(item.id, item.title, item.description, item.isPin);
    }
  });

  return readLocalStorage();
}

function hasKey(key: number): boolean {
  const array: TaskType[] = JSON.parse(localStorage.getItem("tasks") || "[]");
  let isHas = false;

  if (!array || array.length === 0) return isHas;

  array.forEach((item) => {
    if (key === item.id) {
      isHas = true;
    }
  });

  return isHas;
}

function countPinnedTasks(): number {
  const tasksJSON = localStorage.getItem("tasks");

  if (!tasksJSON) {
    return 0;
  }

  const tasks: TaskType[] = JSON.parse(tasksJSON);

  if (!Array.isArray(tasks)) {
    return 0;
  }

  return tasks.reduce((count, task) => (task.isPin ? count + 1 : count), 0);
}

function printArray(arr: TaskType[]): void {
  console.log(JSON.stringify(arr));
}

export {
  setTaskToLocalStorage,
  readLocalStorage,
  deleteTaskFromLocalStorage,
  hasKey,
  shift,
  countPinnedTasks,
  printArray,
};
