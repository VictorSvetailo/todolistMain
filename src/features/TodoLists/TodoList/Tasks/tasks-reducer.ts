import {Dispatch} from 'redux';
import {todoListAPI} from '../../../../api/todoList-api';



const initialState: Array<any> = []


export const tasksReducer = (state = initialState, action: any): any => {
        switch (action.type){
            case 'SET_TASKS':
                    return {...state, [action.todoListId]: action.tasks}
            default:
                return state
        }
}


const setTasksAC = (todoListId: string, tasks: any) => {
    return {
        type: 'SET_TASKS',
        todoListId,
        tasks
    }

}


export const setTasksTC = (todoListId: string) => (dispatch: Dispatch) => {
    todoListAPI.getTasks(todoListId)
        .then((res) => {
            // @ts-ignore
            dispatch(setTasksAC(todoListId, res.data.items))
        })
}
