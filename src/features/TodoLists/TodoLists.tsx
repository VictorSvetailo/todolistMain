import React, {useEffect, useState} from 'react';
import {todoListAPI} from '../../api/todoList-api';
import {TodoList} from './TodoList/TodoList';
import {useAppDispatch} from '../../app/store';
import {fetchTodoListTC} from './todoLists-reducer';
import {useSelector} from 'react-redux';

export const TodoLists = () => {

   const dispatch = useAppDispatch()

    useEffect(()=>{
        dispatch(fetchTodoListTC())
    },[])

    const todoLists = useSelector<any>((state) => state.todoLists);

    return <>
        <h1>TodoLists</h1>
        <div >
            <TodoList todoLists={todoLists}/>
        </div>

        <hr/>

    </>
}
