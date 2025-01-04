import FormTask from './components/FormTask.tsx'
import "../src/styles/main.css"
import ListTask from './components/TasksList.tsx'
import { useEffect } from 'react'
import { readLocalStorage } from './data/localStorage';
import DeleteModal from './components/DeleteModal.tsx';
import EditModal from './components/EditModal.tsx';
import ShareModal from './components/ShareModal.tsx';
import Backdrop from './components/Backdrop.tsx';
import { setListTasks } from './redux/tasksSlice.ts';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const localStorageElements = readLocalStorage();

    if (localStorageElements) {
      dispatch(setListTasks(localStorageElements));
    }
  }, []);

  return (
    <>
      <div className='fake-body'>
        <DeleteModal />
        <EditModal />
        <ShareModal />
        <Backdrop />

        <FormTask />

        <ListTask />
      </div>
    </>
  )
}

export default App;