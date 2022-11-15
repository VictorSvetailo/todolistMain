import React, {MouseEvent, useState} from 'react';
import {todoListAPI} from '../../../api/todoList-api';
import {Tasks, UpdateDomainTaskModelType} from './Tasks/Tasks';
import {useAppDispatch} from '../../../app/store';
import {addTodoListTC, changeTodoListTC, deleteTodoListTC} from '../todoLists-reducer';


type PropsType = {
    todoLists: any
}

export const TodoList: React.FC<PropsType> = ({todoLists}) => {
    const dispatch = useAppDispatch()
    let [title, setTitle] = useState<string>('')

    const addTitle = () => {
        dispatch(addTodoListTC(title))
    }

    const addTask = (id: string, title: string) => {
        todoListAPI.createTask(id, title)
    }

    const deleteTask = (id: string, taskId: string) => {
        todoListAPI.deleteTask(id, taskId)
    }

//@ts-ignore
    let todoList = todoLists.map(tl => {
        const changeTitle = (title: string) => {
            dispatch(changeTodoListTC(tl.id, title))
        }
        const deleteTodoList = (e: MouseEvent<HTMLButtonElement>) => {
            dispatch(deleteTodoListTC(tl.id))
        }
        const changeTitleCB = (taskId: string, title: string) => {
            const model: UpdateDomainTaskModelType = {
                deadline: '',
                description: '',
                priority: 0,
                startDate: '',
                status: 1,
                title: title,
            }
            todoListAPI.updateTask(tl.id, taskId, model)
        }
        const addTaskTitleCB = (title: string) => {
            addTask(tl.id, title)
        }
        const deleteTaskCB = (taskId: string) => {
            deleteTask(tl.id, taskId)
        }

        return <div key={tl.id}>
            <div
                 style={{border: 'solid', flexDirection: 'column', display: 'flex', gap: '10px', flexWrap: 'wrap'}}>
                <div style={{border: 'solid', display: 'flex', gap: '10px', flexWrap: 'wrap'}}>
                    <EditableSpan title={tl.title} changeTitleCB={changeTitle}/>
                    <button onClick={deleteTodoList}>X</button>
                </div>
                <Tasks deleteTaskCB={deleteTaskCB} todoListId={tl.id} addTaskTitleCB={addTaskTitleCB}
                       changeTitleCB={changeTitleCB}/>
            </div>

        </div>
    })

    return (
        <div>
            <div>{title}</div>
            <br/>
            <input onChange={(e) => {
                setTitle(e.currentTarget.value)
            }} type="text"/>
            <button onClick={addTitle}>Add</button>
            <div style={{display: 'flex', gap: '10px', flexWrap: 'wrap'}}>
                {todoList}
            </div>
        </div>
    );
}

type EditableSpanType = {
    title: string
    changeTitleCB: (title: string) => void
}

export const EditableSpan: React.FC<EditableSpanType> = ({changeTitleCB, ...props}) => {
    let [editMode, setEditMode] = useState<boolean>(false)
    let [title, setTitle] = useState<string>(props.title)


    const changeTitle = () => {
        changeTitleCB(title)
        setEditMode(false)
    }
    return <>
        <span>
            <span>
                {editMode
                    ? <input onBlur={changeTitle} onChange={(e) => {
                        setTitle(e.currentTarget.value)
                    }} value={title}/>
                    : <div onClick={() => {
                        setEditMode(true)
                    }}><b>{title}</b></div>}
                </span>
        </span>
    </>
}


