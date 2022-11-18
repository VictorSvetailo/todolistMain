import {Dispatch} from 'redux';
import {todoListAPI, TodoListType} from '../../api/todoList-api';
import {FilterValuesType} from './TodoListsList';
import {fetchTasksAC} from './TodoList/Task/tasks-reducer';
import {setAppStatusAC} from '../../app/app-reducer';

const initialState: Array<any> = [];


export const todoListsReducer = (state = initialState, action: any): any => {
    switch (action.type) {
        case 'SET_TODOLISTS':
            //@ts-ignore
            return action.todoLists.map(tl => ({...tl, filter: 'all'}))
        case 'ADD_TODOLIST':
            //@ts-ignore
            return [{...action.todolist, filter: 'all', entityStatus: 'idle'}, ...state]
        case 'DELETE_TODOLIST':
            //@ts-ignore
            return state.filter(tl => tl.id !== action.todoListId)
        case 'CHANGE_TODOLIST_TITLE':
            return state.filter(tl => tl.id === action.todoListId ? {...tl, title: action.title} : tl)
        case 'CHANGE_FILTER_TODOLIST':
            return state.map(tl => tl.id === action.todoListId ? {...tl, filter: action.filter} : tl)
        case 'CLEAR_DATA':
            return []
        default:
            return state;
    }
}

const setTodoListAC = (todoLists: TodoListType[]) => {
    return {
        type: 'SET_TODOLISTS',
        todoLists: todoLists
    }
}
const addTodoListAC = (todolist: TodoListType) => {
    return {
        type: 'ADD_TODOLIST',
        todolist: todolist
    }
}

const deleteTodoListAC = (todoListId: string) => {
    return {
        type: 'DELETE_TODOLIST',
        todoListId: todoListId
    }
}
const changeTodoListAC = (todoListId: string, title: string) => {
    return {
        type: 'CHANGE_TODOLIST_TITLE',
        todoListId,
        title
    }
}
export const changeFilter = (todoListId: string, filter: FilterValuesType) => {
    return {
        type: 'CHANGE_FILTER_TODOLIST',
        todoListId,
        filter,
    }
}


// при вылогировании использовать
export const clearTodoListDataAC  = () => {
    return {type: 'CLEAR_DATA'}
}

// Thank Create


export const fetchTodoListTC = () => (dispatch: any) => {
    dispatch(setAppStatusAC('loading'))
    todoListAPI.getTodoLists()
        .then((res) => {
            dispatch(setTodoListAC(res.data))
            dispatch(setAppStatusAC('succeeded'))
            return res.data
        })
        .then((todoLists) => {
            todoLists.forEach((tl) => {
                dispatch(fetchTasksAC(tl.id))
            })
        })
        .catch((error)=>{
            alert(error)
        })
}

export const addTodoListTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todoListAPI.createTodoList(title)
        .then((res) => {
            dispatch(addTodoListAC(res.data.data.item))
            dispatch(setAppStatusAC('succeeded'))
        })
}

export const deleteTodoListTC = (todoListId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todoListAPI.deleteTodoList(todoListId)
        .then((res) => {
            dispatch(deleteTodoListAC(todoListId))
            dispatch(setAppStatusAC('succeeded'))
        })
}

export const changeTodoListTC = (todoListId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todoListAPI.updateTodoList(todoListId, title)
        .then((res) => {
            dispatch(changeTodoListAC(todoListId, title))
            dispatch(setAppStatusAC('succeeded'))
        })
}


export type ClearDataActionType = ReturnType<typeof clearTodoListDataAC>


