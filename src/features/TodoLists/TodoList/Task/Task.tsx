import React, {ChangeEvent, MouseEvent, KeyboardEvent, useEffect, useState} from 'react';
import {changeTaskTC, fetchTasksAC} from './tasks-reducer';
import {AppRootStateType, useAppDispatch} from '../../../../app/store';
import {useSelector} from 'react-redux';
import {EditableSpan} from '../../../../components/EditableSpan/EditableSpan';

type TaskType = {
    task: any
    todoListId: string
    deleteTaskCB: (taskId: string) => void
    updateCheckbox: (taskId: string, status: number) => void


}
export const Task: React.FC<TaskType> = ({task, updateCheckbox, todoListId, deleteTaskCB}) => {

    const dispatch = useAppDispatch()

    const changeTitleTaskCB = (taskId: string, title: string) => {
        dispatch(changeTaskTC(todoListId, taskId, {title}))
    }

    // let task = tasks?.map((t: any) => {

    //     return <div key={t.id}>
    //         <div style={{display: 'flex', gap: '10px', flexWrap: 'wrap'}} className={t.status === 2 ? 'is-done' : ''}>
    //             <div><input checked={t.status === 2} type="checkbox" onChange={updateCheckboxH}/></div>
    //             <div><EditableSpan key={t.id} title={t.title} changeTitleCB={changeTitle}/>
    //             </div>
    //             <button onClick={deleteTaskH}>X</button>
    //         </div>
    //     </div>
    // })



    const deleteTaskH = (e: MouseEvent<HTMLButtonElement>) => {
        deleteTaskCB(task.id)
    }
    const changeTitle = (title: string) => {
        changeTitleTaskCB(task.id, title)
    }

    const updateCheckboxH = (e: ChangeEvent<HTMLInputElement>) => {
        let newValueCheckbox = e.currentTarget.checked
        updateCheckbox(task.id, newValueCheckbox ? 2 : 0)
    }

    return <>
        <div>

            <div style={{display: 'flex', gap: '10px', flexWrap: 'wrap'}}
                 className={task.status === 2 ? 'is-done' : ''}>
                <div><input checked={task.status === 2} type="checkbox" onChange={updateCheckboxH}/></div>
                <div><EditableSpan key={task.id} title={task.title} changeTitleCB={changeTitle}/>
                </div>
                <button onClick={deleteTaskH}>X</button>
            </div>
        </div>
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