import React, {ChangeEvent, MouseEvent, useEffect, useState} from 'react';
import {EditableSpan} from '../TodoList';
import {useAppDispatch} from '../../../../app/store';
import {setTasksTC} from './tasks-reducer';
import {useSelector} from 'react-redux';

type TaskType = {
    todoListId: string
    addTaskTitleCB: (taskText: string) => void
    deleteTaskCB: (taskId: string) => void
    changeTitleCB: (id: string, title: string) => void
}
export const Tasks: React.FC<TaskType> = ({todoListId, addTaskTitleCB, deleteTaskCB, changeTitleCB}) => {
    const dispatch = useAppDispatch()
    // let [result, setResult] = useState<Array<any>>([])
    // @ts-ignore
    const tasks = useSelector<Array<any>>(state => state.tasks)
    console.log(tasks)
    useEffect(() => {
        console.log(todoListId)
        dispatch(setTasksTC(todoListId))
    }, [])



    // @ts-ignore
    let task = tasks.map(t => {
        const deleteTaskH = (e: MouseEvent<HTMLButtonElement>) => {
            deleteTaskCB(t.id)
        }
        const changeTitle = (title: string) => {
            changeTitleCB(t.id, title)
        }
        return <div key={t.id} >
            <div style={{display: 'flex', gap: '10px', flexWrap: 'wrap'}}>
                <div>
                    <EditableSpan key={t.id} title={t.title}
                                  changeTitleCB={changeTitle}
                    />
                    <button onClick={deleteTaskH}>X</button>
                </div>
            </div>

        </div>
    })
    let [taskText, setTaskText] = useState<string>('')

    const createTaskText = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskText(e.currentTarget.value)
    }
    const addTaskTitleHandler = () => {
        addTaskTitleCB(taskText)
    }

    return <>
        <div>
            <input onChange={createTaskText} value={taskText} type="text"/>
            <button onClick={addTaskTitleHandler}>Add Task</button>
        </div>
        {task}
    </>
}

export type UpdateDomainTaskModelType = {
    deadline?: string;
    description?: string;
    priority?: number;
    startDate?: string;
    status?: number;
    title?: string;
};