import React, {useState} from 'react';

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