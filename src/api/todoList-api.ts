import axios, {AxiosResponse} from 'axios';
import {FilterValuesType} from '../features/TodoLists/TodoListsList';
import {LoginParamsType} from '../features/Login/login-reducer';

const settings = {
    // чтобы cookies не терялась нужно добавлять withCredentials
    withCredentials: true,
    headers: {
        'API-KEY': 'c6150b07-be78-48c2-be1a-83b0f879593c',
    },
};

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings,
});

// api
export const todoListAPI = {
    getTodoLists() {
        return instance.get<TodoListType[]>('todo-lists')
    },
    createTodoList(title: string) {
        return instance.post<any>('todo-lists', {title: title})
    },
    deleteTodoList(id: string) {
        return instance.delete<any>(`todo-lists/${id}`)
    },
    updateTodoList(id: string, title: string) {
        return instance.put(`todo-lists/${id}`, {title: title,})
        // return instance.put(`todo-lists/${id}`, {title: title,});
    },
    getTasks(todoListId: string) {
        return instance.get<{ items: TaskType }>(`todo-lists/${todoListId}/tasks`);
    },
    createTask(todoListId: string, title: string) {
        return instance.post<{ title: string }, AxiosResponse<ResponseType<{ item: TaskType }>>>(`todo-lists/${todoListId}/tasks`, {title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todoListId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<ResponseType>(`todo-lists/${todoListId}/tasks/${taskId}`, model);
    },
}

// login
export const authAPI = {
    login(data: any) {
        return instance.post<ResponseType<{ userId: number }>>('auth/login', data)
    },
    logout() {
        return instance.delete<any>('auth/login')
    },
    authMe() {
        return instance.get<{ id: number, email: string, login: string }>('auth/me')
    },
}


// - types  -
export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}

export type TodoListType = {
    id: string
    addedDate: any
    order: number
    title: string
    filter?: FilterValuesType
}
export type TaskType = {
    description: string;
    title: string;
    status: 0 | 2;
    priority: 0 | 1;
    startDate: string;
    deadline: string;
    id: string;
    todoListId: string;
    order: number;
    addedDate: string;
};


export type UpdateTaskModelType = {
    title: string
    description: string
    status: 0 | 2
    priority: number
    startDate: string
    deadline: string
}

