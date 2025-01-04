// Создаем Context
import React, { createContext, useRef, useContext, useState, JSXElementConstructor, ReactElement } from 'react';

const Context = createContext();

export const Provider = ({ children }) => {
    const delModal = useRef(null);
    const editModal = useRef(null);
    const shareModal = useRef(null)
    const backdrop = useRef(null);
    const [ openTask, setOpenTask ] = useState('');
    const [ currTask, setCurrTask ] = useState(null); // { id: , title: , description: }
    const [ currOperation, setCurrOperation ] = useState('');
    const [ listTasks, setListTasks ] = useState([]);
    const [ index, setIndex ] = useState(0);

    return (
        <Context.Provider value={{ 
            delModal,
            editModal,
            shareModal,
            openTask,
            setOpenTask,
            currTask,
            setCurrTask,
            currOperation,
            setCurrOperation,
            listTasks,
            setListTasks,
            index,
            setIndex,
            backdrop
        }}>
            {children}
        </Context.Provider>
    );
};

export const useAppContext = () => useContext(Context);
