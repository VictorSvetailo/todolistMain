import {Dispatch} from 'redux';
import {TaskType, todoListAPI, UpdateTaskModelType} from '../../../../api/todoList-api';
import {setAppStatusAC} from '../../../../app/app-reducer';


const initialState: TasksStateType = {}


export const tasksReducer = (state = initialState, action: any): any => {
    switch (action.type) {
        case 'SET_TASKS':
            return {...state, [action.todoListId]: action.tasks}
        case 'ADD_TASK':
            return {...state, [action?.task.todoListId]: [action.task, ...state[action?.task.todoListId]]}
        case 'ADD-TODOLIST':
            return {...state, [action.todoList.id]: []}
        case 'SET_TODOLISTS':
            const copyState = {...state}
            action.todoLists.forEach((tl: any) => {
                copyState[tl.id] = []
            })
            return copyState
        case 'DELETE_TASK':
            return {...state, [action.todoListId]: state[action.todoListId].filter((t: any) => t.id !== action.taskId)}
        case 'UPDATE_TASK':
            return {
                ...state,
                [action.todoListId]: state[action.todoListId]
                    .map((t: any) => t.id === action.taskId ? {...t, ...action.model} : t)
            }
        case 'CLEAR_DATA':
            return {}
        default:
            return state
    }
}

// Action Create
const setTasksAC = (todoListId: string, tasks: any) => {
    return {
        type: 'SET_TASKS',
        todoListId,
        tasks,
    }
}
const addTaskAC = (task: any) => {
    return {
        type: 'ADD_TASK',
        task
    }
}

const deleteTaskAC = (todoListId: string, taskId: string) => {
    return {
        type: 'DELETE_TASK',
        todoListId,
        taskId,
    }
}

const updateTaskAC = (todoListId: string, taskId: string, model: UpdateDomainTaskModelType) => {
    return {
        type: 'UPDATE_TASK',
        todoListId,
        taskId,
        model
    }
}

// Thunk Create
export const fetchTasksAC = (todoListId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todoListAPI.getTasks(todoListId)
        .then((res) => {
            const tasks = res.data.items
            dispatch(setTasksAC(todoListId, tasks))
            dispatch(setAppStatusAC('succeeded'))
        })
}

export const addTaskTC = (todoListId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todoListAPI.createTask(todoListId, title)
        .then((res) => {
            dispatch(addTaskAC(res.data.data.item))
            dispatch(setAppStatusAC('succeeded'))
        })
}

export const deleteTaskTC = (todoListId: string, taskId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todoListAPI.deleteTask(todoListId, taskId)
        .then((res) => {
            dispatch(deleteTaskAC(todoListId, taskId))
            dispatch(setAppStatusAC('succeeded'))
        })
}

export const changeTaskTC = (todoListId: string, taskId: string, domainModel: UpdateDomainTaskModelType) =>
    (dispatch: Dispatch, getState: () => any) => {
        dispatch(setAppStatusAC('loading'))
    const state = getState()
    const task = state.tasks[todoListId].find((t: any) => t.id === taskId)
    if (!task) {
        console.warn('task not found in the state')
        return
    }
    const apiModel: UpdateTaskModelType = {
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        title: task.title,
        status: task.status,
        ...domainModel
    }
    todoListAPI.updateTask(todoListId, taskId, apiModel)
        .then((res) => {
            console.log(domainModel)
            dispatch(updateTaskAC(todoListId, taskId, domainModel))
            dispatch(setAppStatusAC('succeeded'))
        })
}

export type UpdateDomainTaskModelType = {
    deadline?: string;
    description?: string;
    priority?: number;
    startDate?: string;
    status?: number;
    title?: string;
};


export type TasksStateType = {
    [toDoList_ID: string]: Array<TaskType>;
};