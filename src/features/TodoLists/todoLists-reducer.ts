import {Dispatch} from 'redux';
import {todoListAPI, TodoListType} from '../../api/todoList-api';

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
            //@ts-ignore
            return state.filter(tl => tl.id === action.todoListId ? {...tl, title: action.title}: tl)
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


// Thank Create
export const fetchTodoListTC = () => (dispatch: Dispatch) => {
    todoListAPI.getTodoLists()
        .then((res) => {
            dispatch(setTodoListAC(res.data))
        })
}

export const addTodoListTC = (title: string) => (dispatch: Dispatch) => {
    todoListAPI.createTodoList(title)
        .then((res) => {
            dispatch(addTodoListAC(res.data.data.item))
        })
}

export const deleteTodoListTC = (todoListId: string) => (dispatch: Dispatch) => {
    todoListAPI.deleteTodoList(todoListId)
        .then((res) => {
            dispatch(deleteTodoListAC(todoListId))
        })
}

export const changeTodoListTC = (todoListId: string, title: string) => (dispatch: Dispatch) => {
    todoListAPI.updateTodoList(todoListId, title)
        .then((res) => {
            dispatch(changeTodoListAC(todoListId, title))
        })
}


