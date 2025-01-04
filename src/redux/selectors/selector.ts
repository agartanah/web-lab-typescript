import { TaskType } from '../../types';
import { RootState } from '../store';

function selector(state: RootState) {
    return {
      listTasks: state.tasks.listTasks as TaskType[],
      openTask: state.tasks.openTask as number,
      currTask: state.tasks.currTask as TaskType,
      currOperation: state.tasks.currOperation as string
    };
  }

export default selector;
