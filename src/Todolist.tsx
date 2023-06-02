import React, {ChangeEvent} from 'react'
import {FilterValuesType} from './App'
import {AddItemForm} from './AddItemForm'

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type ToDoListPropsType = {
    title: string
    id: string
    tasks: Array<TaskType> // или TaskType[]
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistID: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    filter: FilterValuesType
    removeToDoList: (todolistId: string) => void
}

export function Todolist(props: ToDoListPropsType) {
    const onAllClickHandler = () => props.changeFilter('all', props.id)
    const onActiveClickHandler = () => props.changeFilter('active', props.id)
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id)
    const removeToDoList = () => props.removeToDoList(props.id)

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    return (
        <div style={{background: '#bfcfff', borderRadius: '8px', padding: '8px'}}>
            <h3>{props.title}
                <button onClick={removeToDoList}>X</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {
                    props.tasks.map((el) => {
                        const onDelTaskClickHandler = () => props.removeTask(el.id, props.id)
                        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) =>
                            props.changeTaskStatus(el.id, e.currentTarget.checked, props.id)
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