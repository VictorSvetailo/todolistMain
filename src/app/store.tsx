import {combineReducers, configureStore} from '@reduxjs/toolkit';

import ThunkMiddleware from 'redux-thunk'
import {todoListsReducer} from '../features/TodoLists/todoLists-reducer';
import {useDispatch} from 'react-redux';
import {tasksReducer} from '../features/TodoLists/TodoList/Task/tasks-reducer';
import {authReducer} from '../features/Login/login-reducer';
import {appReducer} from './app-reducer';


const rootReducer = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer,
    auth: authReducer,
    app: appReducer,
})

export const useAppDispatch = () => useDispatch<any>();

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(ThunkMiddleware),
});

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;
