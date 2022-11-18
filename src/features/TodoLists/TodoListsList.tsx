import React, {KeyboardEvent, useCallback, useEffect, useState} from 'react';
import {todoListAPI} from '../../api/todoList-api';
import {TodoList} from './TodoList/TodoList';
import {AppRootStateType, useAppDispatch} from '../../app/store';
import {addTodoListTC, changeFilter, changeTodoListTC, deleteTodoListTC, fetchTodoListTC} from './todoLists-reducer';
import {useSelector} from 'react-redux';
import {addTaskTC, changeTaskTC, deleteTaskTC} from './TodoList/Task/tasks-reducer';
import {EditableSpan} from '../../components/EditableSpan/EditableSpan';
import {Navigate} from 'react-router-dom';


export const TodoListsList = () => {
    const todoLists = useSelector<AppRootStateType, Array<any>>((state) => state.todoLists);
    const dispatch = useAppDispatch()
    let [title, setTitle] = useState<string>('')

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)


    useEffect(() => {
        if (!isLoggedIn) {
            return
        }
        dispatch(fetchTodoListTC())
    }, [])


    const updateCheckboxCB = (todoListId: string, taskId: string, status: number) => {
        dispatch(changeTaskTC(todoListId, taskId, {status}))
    }
    const createTodoList = () => {
        if (title.trim()) {
            dispatch(addTodoListTC(title))
            setTitle('')
        }

    }

    const createTaskCB = useCallback((todoListId: string, title: string) => {
        dispatch(addTaskTC(todoListId, title))
    }, [])

    const changeFilterCB = useCallback((todoListId: string, filter: FilterValuesType) => {
        dispatch(changeFilter(todoListId, filter))
    }, [])

    const deleteTaskCB = (todoListId: string, taskId: string) => {
        dispatch(deleteTaskTC(todoListId, taskId))
    }

    const changeTitleTodoListCB = (todoListId: string, title: string) => {
        dispatch(changeTodoListTC(todoListId, title))
    }
    const deleteTodoListCB = (todoListId: string) => {
        dispatch(deleteTodoListTC(todoListId))
    }

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    let todoListMain = todoLists.map((tl: any) => {
        const changeTitle = (title: string) => {
            changeTitleTodoListCB(tl.id, title)
        }
        return <div key={tl.id}>
            <div style={{border: 'solid', flexDirection: 'column', display: 'flex', gap: '10px', flexWrap: 'wrap'}}>
                <div style={{border: 'solid', display: 'flex', gap: '10px', flexWrap: 'wrap'}}>
                    <TodoList
                        todoList={tl}
                        titleTodoList={tl.title}
                        changeTitle={changeTitle}
                        todoListId={tl.id}
                        deleteTodoListCB={deleteTodoListCB}
                        changeTitleTodoListCB={changeTitleTodoListCB}
                        deleteTaskCB={deleteTaskCB}
                        createTaskCB={createTaskCB}
                        updateCheckboxCB={updateCheckboxCB}
                        changeFilterCB={changeFilterCB}
                    />
                </div>
            </div>

        </div>
    })

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && e.ctrlKey) {
            dispatch(addTodoListTC(title))
            setTitle('')
        }
    }

    return <>
        <h1>TodoLists</h1>
        <div>
            <input value={title} onKeyPress={onKeyPressHandler} onChange={(e) => {
                setTitle(e.currentTarget.value)
            }} type="text"/>
            <button onClick={createTodoList}>Add</button>
            <div style={{display: 'flex', gap: '10px', flexWrap: 'wrap'}}>
                {todoListMain}
            </div>
        </div>

        <hr/>

    </>
}


export type FilterValuesType = 'all' | 'active' | 'completed'
