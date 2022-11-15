import {combineReducers, configureStore} from '@reduxjs/toolkit';

import ThunkMiddleware from 'redux-thunk'
import {todoListsReducer} from '../features/TodoLists/todoLists-reducer';
import {useDispatch} from 'react-redux';
import {tasksReducer} from '../features/TodoLists/TodoList/Tasks/tasks-reducer';


const rootReducer = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer,
})

export const useAppDispatch = () => useDispatch<any>();

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(ThunkMiddleware),
});