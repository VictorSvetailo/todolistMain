import React, {ChangeEvent, KeyboardEvent, MouseEvent, useCallback, useEffect, useState} from 'react';

import {EditableSpan} from '../../../components/EditableSpan/EditableSpan';
import {Task} from './Task/Task';
import {useSelector} from 'react-redux';
import {AppRootStateType, useAppDispatch} from '../../../app/store';
import {fetchTasksAC} from './Task/tasks-reducer';
import {FilterValuesType} from '../TodoListsList';
import {TaskType, TodoListType} from '../../../api/todoList-api';


type PropsType = {
    titleTodoList: string
    todoListId: string
    updateCheckboxCB: (todoListId: string, taskId: string, status: number) => void
    createTaskCB: (todoListId: string, title: string) => void
    deleteTaskCB: (todoListId: string, taskId: string) => void
    changeTitleTodoListCB: (todoListId: string, title: string) => void
    deleteTodoListCB: (todoListId: string) => void
    changeTitle: (title: string) => void
    changeFilterCB: (todoListId: string, filter: FilterValuesType) => void
    todoList: TodoListType


}

export const TodoList: React.FC<PropsType> = ({
                                                  changeFilterCB,
                                                  todoList,
                                                  deleteTodoListCB,
                                                  changeTitle,
                                                  titleTodoList,
                                                  todoListId,
                                                  deleteTaskCB,
                                                  createTaskCB,
                                                  updateCheckboxCB,

                                              }) => {

    let tasks = useSelector<AppRootStateType, Array<any>>((state) => state.tasks[todoListId])
    const dispatch = useAppDispatch()
    // useEffect(() => {
    //     dispatch(fetchTasksAC(todoListId))
    // }, [todoListId])


    const deleteTodoList = (e: MouseEvent<HTMLButtonElement>) => {
        deleteTodoListCB(todoListId)
    }
    const updateCheckbox = (taskId: string, status: number) => {
        updateCheckboxCB(todoListId, taskId, status)
    }
    const createTaskTitleCB = useCallback((title: string) => {
        createTaskCB(todoListId, title)
    }, [])

    const deleteTask = (taskId: string) => {
        deleteTaskCB(todoListId, taskId)
    }


    let taskFilter = tasks
    if (todoList.filter === 'active') {
        taskFilter = taskFilter.filter(t => t.status === 0)
    }
    if (todoList.filter === 'completed') {
        taskFilter = taskFilter.filter(t => t.status === 2)
    }

    const taskMain = taskFilter?.map(t => {
        return (
            <Task key={t.id} task={t} updateCheckbox={updateCheckbox} todoListId={todoListId}
                  deleteTaskCB={deleteTask}
            />
        )
    })

    let [taskText, setTaskText] = useState<string>('')

    const createTaskText = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskText(e.currentTarget.value)
    }
    const addTaskTitleHandler = () => {
        if (taskText.trim()) {
            createTaskTitleCB(taskText)
            setTaskText('')
        }
    }

    const keyPressH = (e: KeyboardEvent<HTMLInputElement>) => {
        if (taskText.trim()) {
            if (e.key === 'Enter') {
                createTaskTitleCB(taskText)
                setTaskText('')
            }
        }
    }

    const onAllClickHandler = useCallback(() => changeFilterCB(todoList.id, 'all'), [todoList.id, changeFilterCB])
    const onActiveClickHandler = useCallback(() => changeFilterCB(todoList.id, 'active'), [todoList.id, changeFilterCB])
    const onCompletedClickHandler = useCallback(() => changeFilterCB(todoList.id, 'completed'), [todoList.id, changeFilterCB])


    return (
        <div>
            <div style={{display: 'flex', flexDirection: 'column', gap: '10px', flexWrap: 'wrap'}}>
                <div style={{display: 'flex', gap: '10px'}}>
                    <EditableSpan title={titleTodoList} changeTitleCB={changeTitle}/>
                    <button onClick={deleteTodoList}>X</button>
                </div>
                <div>
                    <input onChange={createTaskText} value={taskText} type="text" onKeyPress={keyPressH}/>
                    <button onClick={addTaskTitleHandler}>Add Task</button>
                </div>
                {taskMain}
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <button style={todoList.filter === 'all' ? {background: 'black', color: 'white'}: {background: 'white', color: 'black'}} onClick={onAllClickHandler}>All</button>
                    <button style={todoList.filter === 'active' ? {background: 'black' , color: 'white'}: {background: 'white' , color: 'black'}} onClick={onActiveClickHandler}>Active</button>
                    <button style={todoList.filter === 'completed' ? {background: 'black' , color: 'white'}: {background: 'white' , color: 'black'}} onClick={onCompletedClickHandler}>Completed</button>
                </div>

            </div>

        </div>
    );
}



