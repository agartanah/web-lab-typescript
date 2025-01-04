import { useEffect, useRef, useState } from "react";
import "../styles/main.css";
import { shift } from "../data/localStorage";
import { setCurrOperation, setCurrTask, setListTasks, setOpenTask } from "../redux/tasksSlice";
import { useDispatch, useSelector } from "react-redux";
import selector from "../redux/selectors/selector";
import { TaskType } from "../types";
import { PositionType } from "./TasksList";

interface TaskProps {
    title: string;
    description: string;
    isPin: boolean;
    countPinned: number;
    id: number;
    position: PositionType;
    setPosition: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;
    draggedTask: number;
    setDraggedTask: React.Dispatch<React.SetStateAction<number>>;
    currDraggedTask: number;
    setCurrDraggedTask: React.Dispatch<React.SetStateAction<number>>;
}

export default function Task({
    title,
    description,
    isPin,
    countPinned,
    id,
    position,
    setPosition,
    draggedTask,
    setDraggedTask,
    currDraggedTask,
    setCurrDraggedTask,
}: TaskProps) {
    const { listTasks, openTask, currTask } = useSelector(selector);
    const dispatch = useDispatch();

    const pTitle = useRef<HTMLParagraphElement>(null);
    const pDescription = useRef<HTMLParagraphElement>(null);
    const task = useRef<HTMLDivElement>(null);

    const [isInfoOpen, setIsInfoOpen] = useState<boolean>(false);

    useEffect(() => {
        if (isPin == true) return;

        if (currDraggedTask === id && task.current) {
            task.current.style.transform = `translate(${position.x}px, ${position.y}px)`;
        } else if (task.current) {
            const newTaskId = currDraggedTask - Math.round(position.y / 78);

            if (newTaskId !== draggedTask) {
                let draggedIdUp = draggedTask,
                    draggedIdDown = draggedTask - 1;

                if (position.y < 0) {
                    draggedIdUp = draggedTask + 1;
                    draggedIdDown = draggedTask;
                }

                if (newTaskId === draggedTask - 1 && id === draggedIdDown) {
                    setDraggedTask(draggedTask - 1);

                    task.current.style.transition = "transform 0.3s ease";
                    const y = Number(task.current.style.transform.match(/translate\(([-\d.]+)px, ([-\d.]+)px\)/)?.[2]);

                    task.current.style.transform = `translate(${0}px, ${y || y === 0 ? y - 78 : -78
                        }px)`;
                }

                if (newTaskId === draggedTask + 1 && id === draggedIdUp) {
                    setDraggedTask(draggedTask + 1);

                    task.current.style.transition = "transform 0.3s ease";
                    const y = Number(task.current.style.transform.match(/translate\(([-\d.]+)px, ([-\d.]+)px\)/)?.[2]);

                    task.current.style.transform = `translate(${0}px, ${y || y === 0 ? y + 78 : 78
                        }px)`;
                }
            }
        }
    }, [position, currDraggedTask, draggedTask, id, setDraggedTask]);

    useEffect(() => {
        if (draggedTask === 0 && task.current) {
            task.current.style.transform = `translate(${0}px, ${0}px)`;
            task.current.style.transition = "";
            task.current.style.position = "static";
            task.current.style.zIndex = "0";
        }
    }, [draggedTask]);

    useEffect(() => {
        if (currTask?.id === id && pTitle.current && pDescription.current) {
            pTitle.current.textContent = currTask.title;
            pDescription.current.textContent = currTask.description
            console.log("PIZDA");
        }
    }, [currTask]);

    const handleMouseDown = () => {
        setDraggedTask(id);
        setCurrDraggedTask(id);
        setPosition({ x: 0, y: 0 });

        if (task.current) {
            task.current.style.transition = "";
            task.current.style.position = "relative";
            task.current.style.zIndex = "1";
        }
    };

    const handleMouseMove = (event: React.MouseEvent) => {
        if (currDraggedTask !== id || isPin == true) return;

        setIsInfoOpen(false);
        dispatch(setOpenTask(0));

        setPosition((prevPosition) => ({
            x: position.x,
            y: prevPosition.y + event.movementY,
        }));
    };

    const handleMouseUp = () => {
        if (currDraggedTask !== id) {
            return;
        }

        if (draggedTask === id) {
            setPosition({ x: 0, y: 0 });
            setCurrDraggedTask(0);
            setDraggedTask(0);

            return;
        }

        console.log("id " + id);
        console.log("draggedTask " + draggedTask);
        const array = shift(id, draggedTask, listTasks, isPin);

        setCurrDraggedTask(0);
        setDraggedTask(0);
        dispatch(setListTasks(array as TaskType[]));
        dispatch(setOpenTask(id));
    };

    return (
        <div
            className="task-container"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            ref={task}
        >
            <div
                className="task"
                onClick={(event) => {
                    event.stopPropagation();

                    if (openTask === id) {
                        dispatch(setOpenTask(0));
                        return;
                    }

                    dispatch(setOpenTask(id));
                }}
            >
                <div className="task-text">
                    <p
                        ref={pTitle}
                        className={isInfoOpen ? "task-title task-title-extend" : "task-title"}
                    >
                        {title}
                    </p>
                    <p
                        ref={pDescription}
                        className={
                            isInfoOpen
                                ? "task-description task-description-extend"
                                : "task-description"
                        }
                    >
                        {description}
                    </p>
                </div>
                <div className="upper-buttons">
                    <div className="pin-task-button-container">
                        <button
                            className={ isPin ? "pin-button pin-unlock-button" : "pin-button" }
                            onClick={(event) => {
                                event.stopPropagation();

                                if (countPinned >= 3 && !isPin) return;

                                let newIndex: number;
                                
                                console.log(countPinned);

                                if (isPin) {
                                    newIndex = listTasks.length - countPinned + 1;
                                } else {
                                    newIndex = listTasks.length;    
                                }
                                
                                console.log(newIndex);
                                dispatch(setListTasks(shift(id, newIndex, listTasks, !isPin) as TaskType[]));
                            }}
                        >
                        </button>
                    </div>
                    <div className="dell-task-button-container">
                        <button
                            className="dell-button"
                            onClick={(event) => {
                                event.stopPropagation();
                                dispatch(setCurrTask({ id: id, title: title, description: description, isPin: isPin }));
                                dispatch(setCurrOperation("del"));
                            }}
                        ></button>
                    </div>
                </div>
            </div>
            {openTask === id && (
                <div className="task-buttons-container">
                    <button
                        className="share-button"
                        onClick={(event) => {
                            event.stopPropagation();

                            dispatch(setCurrTask({ id: id, title: title, description: description, isPin: isPin }));
                            dispatch(setCurrOperation("share"));
                        }}
                    ></button>
                    <button
                        className="info-button"
                        onClick={(event) => {
                            event.stopPropagation();

                            if (isInfoOpen) {
                                setIsInfoOpen(false);
                                return;
                            }

                            setIsInfoOpen(true);
                        }}
                    ></button>
                    <button
                        className="edit-button"
                        onClick={(event) => {
                            event.stopPropagation();

                            dispatch(setCurrTask({ id: id, title: title, description: description, isPin: isPin }));
                            dispatch(setCurrOperation("edit"));
                        }}
                    ></button>
                </div>
            )}
        </div>
    );
}
