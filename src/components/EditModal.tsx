import React, { useState, useRef, useEffect } from 'react';
import { 
    setTaskToLocalStorage
} from "../data/localStorage";
import { useDispatch, useSelector } from "react-redux";
import { setCurrOperation, setCurrTask, setListTasks } from "../redux/tasksSlice";
import selector from '../redux/selectors/selector';

export default function EditModal() {
    const { currTask, currOperation } = useSelector(selector);
    const dispatch = useDispatch();

    const inputTitle = useRef<HTMLInputElement>(null);
    const inputDescription = useRef<HTMLTextAreaElement>(null);
    const editModal = useRef<HTMLDialogElement>(null);
    const editModalContent = useRef<HTMLDivElement>(null);

    const [ isError, setIsError ] = useState(false);
    const [ titleValue, setTitleValue ] = useState('Title...');
    const [ descriptionValue, setDescriptionValue ] = useState('Description...');

    useEffect(() => {
        if (currOperation == 'edit') {
            editModal.current?.showModal();
            
            setTitleValue(currTask.title);
            setDescriptionValue(currTask.description);
        }
    }, [currOperation]);

    function onClickBackdrop(event: React.MouseEvent<HTMLDialogElement>) {
        if (event.target == editModal.current && 
            (event.target != editModalContent.current &&
            event.target != inputTitle.current &&
            event.target != inputDescription.current)) {
            editModal.current.close();
            
            setIsError(false);
            dispatch(setCurrOperation(''));
        }
    }
    
    function onClickSave() {
        if (titleValue == '') {
            setIsError(true);
    
            return;
        }

        setIsError(false);
        
        dispatch(setListTasks(setTaskToLocalStorage(currTask.id, titleValue, descriptionValue, currTask.isPin)));
    
        editModal.current?.close();

        dispatch(setCurrTask({ id: currTask.id, title: titleValue, description: descriptionValue, isPin: currTask.isPin }));
        dispatch(setCurrOperation(''));
    }
    
    function onClickCancel() {
        editModal.current?.close();

        setIsError(false);
        dispatch(setCurrOperation(''));
    }

    return (
        <dialog className="edit-modal" ref={ editModal } onMouseDown={ onClickBackdrop }>
            <div className="edit-modal-content" ref={ editModalContent }>
                <div className="input-container">
                    <input type="text"
                        className={ isError ? "input-task error-value" : "input-task" }
                        ref={ inputTitle }
                        value={ titleValue }
                        onChange={ (event) => {
                            setTitleValue(event.target.value);
                        } }
                    />
                    <textarea className="input-task input-description"
                        ref={ inputDescription }
                        value={ descriptionValue }
                        onChange={ (event) => {
                            setDescriptionValue(event.target.value);
                        } }
                    />
                </div>
                <div className="edit-modal-buttons-container">
                    <button className="text-buttons" onClick={ onClickCancel }>Cancel</button>
                    <button className="text-buttons" onClick={ onClickSave }>Save</button>
                </div>
            </div>
        </dialog>
    );
}