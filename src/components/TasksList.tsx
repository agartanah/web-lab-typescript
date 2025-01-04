import Task from "./Task";
import "../styles/main.css";
import { useState } from "react";
import NoTasks from "./NoTasks";
import { useSelector } from "react-redux";
import selector from "../redux/selectors/selector";
import { countPinnedTasks } from "../data/localStorage";

export interface PositionType {
  x: number;
  y: number;
}

export default function ListTask() {
  // Указываем тип состояния через RootState
  const { listTasks } = useSelector(selector);

  const [position, setPosition] = useState<PositionType>({ x: 0, y: 0 });
  const [draggedTask, setDraggedTask] = useState<number>(0);
  const [currDraggedTask, setCurrDraggedTask] = useState<number>(0);

  const countPinned = countPinnedTasks();

  return (
    <div id="list-task-container" className="list-task-container">
      {listTasks.length === 0 ? (
        <NoTasks />
      ) : (
        listTasks.map((elem) => (
          <Task
            key={elem.id}
            title={elem.title}
            description={elem.description}
            isPin={elem.isPin}
            countPinned={countPinned}
            id={elem.id}
            position={position}
            setPosition={setPosition}
            draggedTask={draggedTask}
            setDraggedTask={setDraggedTask}
            currDraggedTask={currDraggedTask}
            setCurrDraggedTask={setCurrDraggedTask}
          />
        ))
      )}
    </div>
  );
}
