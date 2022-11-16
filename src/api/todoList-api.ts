import axios from "axios";
import {UpdateDomainTaskModelType} from '../features/TodoLists/TodoList/Task/Task';

const settings = {
    // чтобы cookies не терялась нужно добавлять withCredentials
    withCredentials: true,
    headers: {
        "API-KEY": "c6150b07-be78-48c2-be1a-83b0f879593c",
    },
};

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    ...settings,
});

// api
export const todoListAPI = {
    getTodoLists(){
        return instance.get<TodoListType[]>('todo-lists')
    },
    createTodoList(title: string){
        return instance.post<any>('todo-lists', {title: title})
    },
    deleteTodoList(id: string){
        return instance.delete<any>(`todo-lists/${id}`)
    },
    updateTodoList(id: string, title: string){
        return instance.put(`todo-lists/${id}`, {title: title,})
        // return instance.put(`todo-lists/${id}`, {title: title,});
    },
    getTasks(todoListId: string) {
        return instance.get<any>(`todo-lists/${todoListId}/tasks`);
    },
    createTask(todoListId: string, title: string){
        return instance.post<any>(`todo-lists/${todoListId}/tasks`, {title: title})
    },
    deleteTask(todolistId: string, taskId: string){
        return instance.delete(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todoListId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<ResponseType>(`todo-lists/${todoListId}/tasks/${taskId}`, model);
    },
}


export type UpdateTaskModelType = {
    title: string
    description: string
    status: 0 | 2
    priority: number
    startDate: string
    deadline: string
}

// - types -
export type TodoListType ={
    id: string
    addedDate: any
    order: number
    title: string
}


/*
export type UpdateTaskModelType = {
    deadline: string;
    description: string;
    priority: number;
    startDate: string;
    status: number;
    title: string;
};*/
