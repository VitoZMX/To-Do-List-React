import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import {FilterValuesType} from './App'

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type ToDoListPropsType = {
    title: string
    tasks: Array<TaskType> // или TaskType[]
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    filter: FilterValuesType
}

export function Todolist(props: ToDoListPropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            props.addTask(newTaskTitle)
            setNewTaskTitle('')
        }
    }
    const addTask = () => {
        if (newTaskTitle.trim()) {
            props.addTask(newTaskTitle.trim())
            setNewTaskTitle('')
        } else {
            setError('Field required')
        }
    }

    const onAllClickHandler = () => props.changeFilter('all')
    const onActiveClickHandler = () => props.changeFilter('active')
    const onCompletedClickHandler = () => props.changeFilter('completed')

    return (
        <div style={{background: '#bfcfff', borderRadius: '8px', padding: '8px'}}>
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTitle}
                       onChange={onNewTitleChangeHandler}
                       onKeyDownCapture={onKeyPressHandler}
                       className={error ? 'error' : ''}
                />
                <button onClick={addTask}>Add</button>
                {error && <div className="error-message">{error}</div>}
            </div>
            <ul>
                {
                    props.tasks.map((el) => {
                        const onDelTaskClickHandler = () => props.removeTask(el.id)
                        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) =>
                            props.changeTaskStatus(el.id, e.currentTarget.checked)

                        return (
                            <li className={el.isDone ? 'is-done' : ''}>
                                <input type="checkbox"
                                       checked={el.isDone}
                                       onChange={onChangeStatusHandler}/>
                                <span>{el.title}</span>
                                <button onClick={onDelTaskClickHandler}>Delete
                                </button>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <button
                    className={props.filter === 'all' ? 'active-filter' : ''}
                    onClick={onAllClickHandler}>All
                </button>
                <button
                    className={props.filter === 'active' ? 'active-filter' : ''}
                    onClick={onActiveClickHandler}>Active
                </button>
                <button
                    className={props.filter === 'completed' ? 'active-filter' : ''}
                    onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    )
}