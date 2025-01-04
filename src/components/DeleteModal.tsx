import { useRef, useEffect } from 'react';
import { 
    deleteTaskFromLocalStorage
} from "../data/localStorage";
import { setOpenTask, setCurrOperation, setListTasks } from "../redux/tasksSlice";
import { useDispatch, useSelector } from "react-redux";
import selector from '../redux/selectors/selector';

export default function DeleteModal() {
    const { openTask, currTask, currOperation } = useSelector(selector);
    const dispatch = useDispatch();

    const delModal = useRef<HTMLDialogElement>(null);
    const delModalContent = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (currOperation == 'del') {   
            delModal.current?.showModal();
        }
    }, [currOperation])

    function onClickBackdrop(event: React.MouseEvent<HTMLDialogElement>) {
        if (event.target === delModal.current && event.target !== delModalContent.current) {
            delModal.current?.close();
            dispatch(setCurrOperation(''));
        }
    }

    function onClickYes() {
        delModal.current?.close();
        
        if (openTask == currTask.id) {
            dispatch(setOpenTask(0));
        }

        dispatch(setListTasks(deleteTaskFromLocalStorage(currTask.id)));
        
        dispatch(setCurrOperation(''));
    }

    function onClickNo() {
        delModal.current?.close();

        dispatch(setCurrOperation(''));
    }

    return (
        <dialog className="modal-window" ref={ delModal } onMouseDown={ onClickBackdrop }>
            <div className="modal-content-container" ref={ delModalContent }>
                <div className="modal-decoration">
                </div>
                <div className="modal-text-container">
                    <p className="modal-text">Delete this task?</p>
                </div>
                <div className="modal-buttons-container">
                    <button className="text-buttons" onClick={ onClickYes }>Да</button>
                    <button className="text-buttons re-bg" onClick={ onClickNo }>Нет</button>
                </div>
            </div>
        </dialog>
    );
}
