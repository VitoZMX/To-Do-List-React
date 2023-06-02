import React, {ChangeEvent} from 'react'
import {FilterValuesType} from './App'
import {AddItemForm} from './AddItemForm'
import {EditableSpan} from './EditableSpan'

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
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
    removeToDoList: (todolistId: string) => void
}

export function Todolist(props: ToDoListPropsType) {
    const onAllClickHandler = () => props.changeFilter('all', props.id)
    const onActiveClickHandler = () => props.changeFilter('active', props.id)
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id)
    const removeToDoList = () => props.removeToDoList(props.id)
    const changeTodolistTitle = (newTitle: string) => props.changeTodolistTitle(props.id, newTitle)

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    return (
        <div style={{background: '#bfcfff', borderRadius: '8px', padding: '8px'}}>
            <h3>
                <EditableSpan title={props.title} OnChange={changeTodolistTitle}/>
                <button onClick={removeToDoList}>X</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {
                    props.tasks.map((el) => {
                        const onDelTaskClickHandler = () => props.removeTask(el.id, props.id)
                        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) =>
                            props.changeTaskStatus(el.id, e.currentTarget.checked, props.id)
                        const onChangeTitleHandler = (newValue: string) =>
                            props.changeTaskTitle(el.id, newValue, props.id)
                        return (
                            <li className={el.isDone ? 'is-done' : ''}>
                                <input type="checkbox"
                                       checked={el.isDone}
                                       onChange={onChangeStatusHandler}/>
                                <EditableSpan title={el.title} OnChange={onChangeTitleHandler}/>
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